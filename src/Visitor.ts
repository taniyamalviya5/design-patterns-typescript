
interface ComponentInterface {
    accept: (visitor: VisitorInterface) => void;
}

interface ConcreteComponentA extends ComponentInterface {
    exclusiveMethodOfConcreteComponentA: () => string;
}

interface ConcreteComponentB extends ComponentInterface {
    specialMethodOfConcreteComponentB: () => string;
}

interface VisitorInterface {
    visitConcreteComponentA(element: ConcreteComponentA): void;
    visitConcreteComponentB(element: ConcreteComponentB): void;
}

const ConcreteVisitor1 = (): VisitorInterface => ({
    visitConcreteComponentA: (element: ConcreteComponentA): void => console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`),
    visitConcreteComponentB: (element: ConcreteComponentB): void => console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`),
});

const ConcreteVisitor2 = (): VisitorInterface => ({
    visitConcreteComponentA: (element: ConcreteComponentA): void => console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`),
    visitConcreteComponentB: (element: ConcreteComponentB): void => console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`),
});

const ConcreteComponentA = (): ConcreteComponentA => ({
    accept: (visitor: VisitorInterface): void => visitor.visitConcreteComponentA(ConcreteComponentA()),
    exclusiveMethodOfConcreteComponentA: (): string => 'A',
});

const ConcreteComponentB = (): ConcreteComponentB => ({
    accept: (visitor: VisitorInterface): void => visitor.visitConcreteComponentB(ConcreteComponentB()),
    specialMethodOfConcreteComponentB: (): string => 'B',
});

const clientCode = (components: ComponentInterface[], visitor: VisitorInterface) => {
    for (const component of components) {
        component.accept(visitor);
    };
};

const main = () => {
    console.log('');

    console.log('Visitor Design Pattern');
    console.log('--------------------------');

    const components = [ConcreteComponentA(), ConcreteComponentB()];

    console.log('The client code works with all visitors via the base Visitor interface:');

    const visitor1 = ConcreteVisitor1();
    clientCode(components, visitor1);
    console.log('');

    console.log('It allows the same client code to work with different types of visitors:');

    const visitor2 = ConcreteVisitor2();
    clientCode(components, visitor2);
};

export default main;