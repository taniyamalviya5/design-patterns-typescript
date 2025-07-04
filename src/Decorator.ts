interface IDecorator {
    operation(): string;
}

const ConcreteComponent = (): IDecorator => ({
    operation: (): string => 'ConcreteComponent',
});

const Decorator = (component: IDecorator): IDecorator => ({
    operation: (): string => component.operation(),
});

const ConcreteDecoratorA = (component: IDecorator): IDecorator => ({
    operation: (): string => `ConcreteDecoratorA(${Decorator(component).operation()})`,
});

const ConcreteDecoratorB = (component: IDecorator): IDecorator => ({
    operation: (): string => `ConcreteDecoratorB(${Decorator(component).operation()})`,
});

const clientCode = (component: IDecorator) => {
    console.log(`RESULT: ${component.operation()}`);
};

const main = () => {
    console.log('');

    console.log('Decorator Design Pattern');
    console.log('--------------------------');

    const simple = ConcreteComponent();
    console.log('Client: I\'ve got a simple component:');
    clientCode(simple);
    console.log('');

    const decorator1 = ConcreteDecoratorA(simple);
    const decorator2 = ConcreteDecoratorB(decorator1);
    console.log('Client: Now I\'ve got a decorated component:');
    clientCode(decorator2);
};

export default main;