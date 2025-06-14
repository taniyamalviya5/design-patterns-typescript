interface AbstractionInterface {
    operation(): string;
}

interface ImplementationInterface {
    operationImplementation(): string;
}

const Abstraction = (implementation: ImplementationInterface): AbstractionInterface => ({
    operation: () => `Abstraction: Base operation with:\n ${implementation.operationImplementation()}`
});

const ExtendedAbstraction = (implementation: ImplementationInterface): AbstractionInterface => ({
    ...Abstraction(implementation),
    operation: () => `Extended Abstraction: Extended operation with:\n ${implementation.operationImplementation()}`
});

const ConcreteImplementationA = (): ImplementationInterface => ({
    operationImplementation: () => 'ConcreteImplementationA: Here\'s the result on the platform A.'
});

const ConcreteImplementationB = (): ImplementationInterface => ({
    operationImplementation: () => 'ConcreteImplementationB: Here\'s the result on the platform B.'
});

const clientCode = (abstraction: AbstractionInterface) => {
    console.log(abstraction.operation());
};

const Bridge = () => {
    console.log('');
    console.log('Bridge Design Pattern');
    let implementation = ConcreteImplementationA();
    let abstraction = Abstraction(implementation);

    console.log('Client: I\'ve got a simple abstraction:');
    clientCode(abstraction);

    console.log('');

    implementation = ConcreteImplementationB();
    abstraction = ExtendedAbstraction(implementation);
    console.log('Client: Now I\'ve got an extended abstraction:');
    clientCode(abstraction);
};

export default Bridge;