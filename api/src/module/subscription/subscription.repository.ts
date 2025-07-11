import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";

export class SubscriptionRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }


    async subscribeUserByToken(token: string, price: number, uid: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows instanceof Array) {
            const row: any = rows[0];
            const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ?", [row.email]);
            if (rows2 instanceof Array) {
                if (rows2.length > 0) {
                    await this.db.query("DELETE FROM subscription WHERE user_email = ?", [row.email]);
                }
            }
            return this.db.query("INSERT INTO subscription (user_email, created_at, price, is_pay) VALUES (?, ?, ?, ?)", [row.email, new Date(), price, uid]);
        }

    }


    async validationSubscription(token: string) {
        await this.db.connect()
        await this.db.query("UPDATE subscription set is_pay = '' where is_pay = ?", [token.replace(":", "")])
        return
    }


    async subscriptionPrice() {
        await this.db.connect();
        const [rows, filed] = await this.db.query("SELECT * FROM price_sub");
        return rows;
    }


}