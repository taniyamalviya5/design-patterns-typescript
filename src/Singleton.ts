interface ISingleton {
    someBusinessLogic(): void;
    anotherMethod(): void;
}

const Creator = () => {
    let instance: ISingleton | null = null;

    const privateConstructor = () => {
        const somePrivateVariable: string = "I'm a private variable";

        return {
            someBusinessLogic: () => {
                console.log('Executing some business logic');
                console.log(somePrivateVariable);
            },
            anotherMethod: () => {
                console.log('Executing another method');
            },
        };
    };

    const getInstance = (): ISingleton => {
        if (!instance) {
            instance = privateConstructor();
        }

        return instance;
    }

    return {
        getInstance
    };

};

const ClientCode = () => {
    const s1 = Creator().getInstance();
    const s2 = Creator().getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    }
    s1.someBusinessLogic();
    s2.anotherMethod();
}

const Singleton = () => {
    console.log('');
    console.log('Singleton Design Pattern');
    console.log('--------------------------');
    ClientCode();

    console.log('');
};

export default Singleton;