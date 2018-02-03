

/**
 * 机器人执行顺序管理器
 * 0 为自动上报值
 */
export default class OrderManager {
    constructor() {
        this.index = 0;
        this.indexList = [];
    }

    /**
     * 根据执行行为创建订单，并加入到订单队列
     */
    create() {
        let order = {};
        order.id= this.orderId();
        return order;
    }


    /**
     * 生成订单ID
     */
    orderId() {
        this.index++;
        const maxId = 255;
        if (this.index >= maxId) {
            this.index = 1;
        }
        return this.index;
    }
}
