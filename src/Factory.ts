import { factory } from "typescript";

interface Product {
    operation(): string;
}

interface CreatorInterface {
    factoryMethod(): Product;
    someOperation(): string;
}

const Creator = (): CreatorInterface => {
    const factoryMethod = () => {
        return {
            operation: () => "Result of the ConcreteProduct"
        };
    };

    const someOperation = () => {
        const product = factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    };

    return { factoryMethod, someOperation }
};

const ConcreteProduct1 = (): Product => {
    const operation = () => {
        return "{Result of the ConcreteProduct1}";
    };

    return { operation };
};

const ConcreteProduct2 = (): Product => {
    const operation = () => {
        return "{Result of the ConcreteProduct2}";
    };

    return { operation };
};

const ConcreteCreator1 = (): CreatorInterface => {
    const factoryMethod = () => ConcreteProduct1();

    return { ...Creator(), factoryMethod };
};

const ConcreteCreator2 = (): CreatorInterface => {
    const factoryMethod = () => ConcreteProduct2();

    return { ...Creator(), factoryMethod };
};

const ClientCode = (creator: CreatorInterface) => {
    console.log("Client: I'm not aware of the creator's class, but it still works.");
    console.log(creator.someOperation());
};

const Factory = () => {
    console.log('');

    console.log('Factory Design Pattern');
    console.log('--------------------------');

    console.log("App: Launched with the ConcreteCreator1.");
    ClientCode(ConcreteCreator1());
    console.log("");

    console.log("App: Launched with the ConcreteCreator2.");
    const creator2 = ConcreteCreator2();
    ClientCode(creator2);
};

export default Factory;