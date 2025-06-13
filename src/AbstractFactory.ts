interface AbstractProductA {
    useFullOperation(): string;
}

interface AbstractProductB {
    useFullOperation(): string;
    anotherUseFullOperation(collaborate: AbstractProductA): string;
}

interface AbstractFactoryInterface {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}

// Product A1
const ConcreteProductA1 = (): AbstractProductA => ({
    useFullOperation: () => "ConcreteProductA1: Full operation"
});

// Product A2
const ConcreteProductA2 = (): AbstractProductA => ({
    useFullOperation: () => "ConcreteProductA2: Full operation"
});

// concrete Product B1
const ConcreteProductB1 = (): AbstractProductB => ({
    useFullOperation: () => "ConcreteProductB1: Full operation",
    anotherUseFullOperation: (collaborate: AbstractProductA): string => {
        const result = collaborate.useFullOperation();
        return `ConcreteProductB1: Another full operation (${result})`;
    }
})

// concrete Product B2
const ConcreteProductB2 = (): AbstractProductB => ({
    useFullOperation: (): string => "ConcreteProductB2: Full operation",
    anotherUseFullOperation: (collaborate: AbstractProductA): string => {
        const result = collaborate.useFullOperation();
        return `ConcreteProductB2: Another full operation (${result})`;
    }
})

// Concrete Factory A
const ConcreteFactoryA = (): AbstractFactoryInterface => ({
    createProductA: () => ConcreteProductA1(),
    createProductB: () => ConcreteProductB1()
})

// Concrete Factory B
const ConcreteFactoryB = (): AbstractFactoryInterface => ({
    createProductA: () => ConcreteProductA2(),
    createProductB: () => ConcreteProductB2()
})

// Client code
const clientCode = (factory: AbstractFactoryInterface) => {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.useFullOperation());
    console.log(productB.anotherUseFullOperation(productA));
}

// Abstract Factory Pattern Implementation
const AbstractFactory = async () => {
    console.log('Abstract Factory Design Pattern');
    console.log('--------------------------');
    console.log('Client: Testing client code with the first factory type...');
    clientCode(ConcreteFactoryA());

    console.log('');

    console.log('Client: Testing the same client code with the second factory type...');
    clientCode(ConcreteFactoryB());

    console.log('');
};

export default AbstractFactory;