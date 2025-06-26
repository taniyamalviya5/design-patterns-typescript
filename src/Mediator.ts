interface Mediator {
    notify(sender: object, event: string): void;
}

interface BaseComponentInterface {
    mediator?: Mediator;
    setMediator: (mediator: Mediator) => void;
}

interface Component1Interface extends BaseComponentInterface {
    doA: (mediator?: Mediator) => void;
    doB: (mediator?: Mediator) => void;
}

interface Component2Interface extends BaseComponentInterface {
    doC: (mediator?: Mediator) => void;
    doD: (mediator?: Mediator) => void;
}


const BaseComponent = (mediatorData?: Mediator): BaseComponentInterface => {

    let mediator: Mediator | undefined = mediatorData;

    const setMediator = (mediator: Mediator): void => {
        mediator = mediator;
    };

    return {
        mediator,
        setMediator
    }

};

const Component1 = (): Component1Interface => ({
    ...BaseComponent(),
    doA: (mediator?: Mediator): void => {
        console.log('Component 1 does A.');
        BaseComponent(mediator).mediator?.notify(Component1(), 'A');
    },
    doB: (mediator?: Mediator): void => {
        console.log('Component 1 does B.');
        BaseComponent(mediator).mediator?.notify(Component1(), 'B');
    }
});

const Component2 = (): Component2Interface => ({
    ...BaseComponent(),
    doC: (mediator?: Mediator): void => {
        console.log('Component 2 does C.');
        BaseComponent(mediator).mediator?.notify(Component2(), 'C');
    },
    doD: (mediator?: Mediator): void => {
        console.log('Component 2 does D.');
        BaseComponent(mediator).mediator?.notify(Component2(), 'D');
    }
});

const ConcreteMediator = (component1: Component1Interface, component2: Component2Interface): Mediator => ({
    notify: (sender: object, event: string): void => {
        component1.setMediator(ConcreteMediator(component1, component2));
        component2.setMediator(ConcreteMediator(component1, component2));

        if (event === 'A') {
            console.log('Mediator reacts on A and triggers following operations:');
            Component2().doC();
        }

        if (event === 'D') {
            console.log('Mediator reacts on D and triggers following operations:');
            Component1().doB();
            Component2().doC();
        }
    }
});

const main = () => {
    console.log('');

    console.log('Mediator Design Pattern');
    console.log('--------------------------');

    const c1 = Component1();
    const c2 = Component2();

    const mediator = ConcreteMediator(c1, c2);

    console.log('Client triggers operation A.');
    c1.doA(mediator);

    console.log('');
    console.log('Client triggers operation D.');
    c2.doD(mediator);
}

export default main;