export class RandomIdGenerator {
    static generate(size) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i=0; i<size; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    static numeric(){
        Math.round(Math.random() * Math.random() * Math.random())
    }
}

export default RandomIdGenerator;