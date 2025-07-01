interface AbstractInterface {
    templateMethod: () => void;
    baseOperation1: () => void;
    baseOperation2: () => void;
    baseOperation3: () => void;
    requiredOperations1: () => void;
    requiredOperations2: () => void;
    hook1: () => void;
    hook2: () => void;
}

const Abstract = (): AbstractInterface => {

    const baseOperation1 = (): void => console.log('AbstractClass says: I am doing the bulk of the work');
    const baseOperation2 = (): void => console.log('AbstractClass says: But I let subclasses override some operations');
    const baseOperation3 = (): void => console.log('AbstractClass says: But I am doing the bulk of the work anyway');

    let requiredOperations1 = (): void => {
        throw new Error("Abstract method - must be implemented");
    };
    let requiredOperations2 = (): void => {
        throw new Error("Abstract method - must be implemented");
    };

    const hook1 = (): void => { };
    const hook2 = (): void => { };

    const templateMethod = (): void => {
        baseOperation1();
        requiredOperations1();
        baseOperation2();
        hook1();
        requiredOperations2();
        baseOperation3();
        hook2();
    };

    return {
        templateMethod,
        baseOperation1,
        baseOperation2,
        baseOperation3,
        get requiredOperations1() { return requiredOperations1; },
        set requiredOperations1(impl) { requiredOperations1 = impl; },
        get requiredOperations2() { return requiredOperations2; },
        set requiredOperations2(impl) { requiredOperations2 = impl; },
        hook1,
        hook2
    };
};

const ConcreteClass1 = () => {
    const abstract: AbstractInterface = Abstract();
    abstract.requiredOperations1 = (): void => console.log('ConcreteClass1 says: Implemented Operation1');
    abstract.requiredOperations2 = (): void => console.log('ConcreteClass1 says: Implemented Operation2');
    return abstract;
};

const ConcreteClass2 = () => {
    const abstract: AbstractInterface = Abstract();
    abstract.requiredOperations1 = (): void => console.log('ConcreteClass2 says: Implemented Operation1');
    abstract.requiredOperations2 = (): void => console.log('ConcreteClass2 says: Implemented Operation2');
    abstract.hook1 = (): void => console.log('ConcreteClass2 says: Overridden Hook1');
    return abstract;
};

const clientCode = (abstract: any) => {
    abstract.templateMethod();
};

const main = () => {
    console.log('');

    console.log('Template Design Pattern');
    console.log('--------------------------');

    console.log('Same client code can work with different subclasses:');
    clientCode(ConcreteClass1());
    console.log('');

    console.log('Same client code can work with different subclasses:');
    clientCode(ConcreteClass2());
};

export default main;