interface FlyweightInterface {
    operation: (uniqueState: any) => void;
}

interface FlyweightFactoryInterface {
    getFlyweight: (sharedState: string[]) => FlyweightInterface;
    listFlyweights: () => void;
}

const Flyweight = (sharedState: any) => ({
    operation: (uniqueState: any) => {
        const s = JSON.stringify(sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
});

const FlyweightFactory = (initialFlyweights: string[][]): FlyweightFactoryInterface => {
    const flyweights: { [key: string]: FlyweightInterface } = {};

    const getKey = (state: string[]) => state.join('_');

    for (const state of initialFlyweights) {
        flyweights[getKey(state)] = Flyweight(state);
    };

    const getFlyweight = (sharedState: string[]): FlyweightInterface => {
        const key = getKey(sharedState);

        if (!(key in flyweights)) {
            console.log(`FlyweightFactory: Can't find a flyweight, creating new one.`);
            flyweights[key] = Flyweight(sharedState);
        } else {
            console.log(`FlyweightFactory: Reusing existing flyweight.`);
        }

        return flyweights[key];
    };

    const listFlyweights = () => {
        const count = Object.keys(flyweights).length;
        console.log(`FlyweightFactory: I have ${count} flyweights:`);
        for (const key in flyweights) {
            console.log(key);
        }
    };

    return {
        getFlyweight,
        listFlyweights
    };
};

const addCarToPoliceDatabase = (ff: FlyweightFactoryInterface, plates: string, owner: string,
    brand: string, model: string, color: string,) => {
    console.log(`\nClient: Adding a car to database.`);

    const flyweight = ff.getFlyweight([brand, model, color]);
    flyweight.operation({ plates, owner });
}

const main = () => {
    console.log('');

    console.log('Flyweight Design Pattern');
    console.log('--------------------------');

    const factory = FlyweightFactory([
        ['Chevrolet', 'Camaro2018', 'pink'],
        ['Mercedes Benz', 'C300', 'black'],
        ['Mercedes Benz', 'C500', 'red'],
        ['BMW', 'M5', 'red'],
        ['BMW', 'X6', 'white'],
    ]);

    factory.listFlyweights();

    addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');
    addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

    console.log('');

    factory.listFlyweights();
};

export default main;