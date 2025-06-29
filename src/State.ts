interface ContextInterface {
    transitionTo: (newState: StateInterface) => void;
    request1: () => void;
    request2: () => void;
}

interface StateInterface {
    setContext: (context: ContextInterface) => void;
    name: string;
    handle1: () => void;
    handle2: () => void;
}

// ConcreteStateA as arrow function
const ConcreteStateA = (): StateInterface => {
    let context: ContextInterface;

    const setContext = (ctx: ContextInterface) => {
        context = ctx;
    };

    const handle1 = () => {
        console.log('ConcreteStateA handles request1.');
        console.log('ConcreteStateA wants to change the state of the context.');
        context.transitionTo(ConcreteStateB());
    };

    const handle2 = () => {
        console.log('ConcreteStateA handles request2.');
    };

    return {
        setContext,
        handle1,
        handle2,
        name: 'ConcreteStateA',
    };
};

// ConcreteStateB as arrow function
const ConcreteStateB = (): StateInterface => {
    let context: ContextInterface;

    const setContext = (ctx: ContextInterface) => {
        context = ctx;
    };

    const handle1 = () => {
        console.log('ConcreteStateB handles request1.');
    };

    const handle2 = () => {
        console.log('ConcreteStateB handles request2.');
        console.log('ConcreteStateB wants to change the state of the context.');
        context.transitionTo(ConcreteStateA());
    };

    return {
        setContext,
        handle1,
        handle2,
        name: 'ConcreteStateB',
    };
};

// Context as arrow function
const Context = (initialState: StateInterface): ContextInterface => {
    let state = initialState;

    const context: ContextInterface = {
        transitionTo: (newState: StateInterface) => {
            console.log(`Context: Transition to ${newState.name}.`);
            state = newState;
            state.setContext(context);
        },
        request1: () => {
            state.handle1();
        },
        request2: () => {
            state.handle2();
        }
    };

    context.transitionTo(initialState);

    return context;
};

// Client code
const main = () => {
    console.log('');
    console.log('State Design Pattern');
    console.log('--------------------------');

    const context = Context(ConcreteStateA());
    context.request1();
    context.request2();
};

export default main;