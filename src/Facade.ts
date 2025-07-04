interface FacadeInterface {
    operation(): string;
}

interface Subsystem1Interface {
    operation1(): string;
    operationN(): string;
}

interface Subsystem2Interface {
    operation1(): string;
    operationZ(): string;
}

const Subsystem1 = (): Subsystem1Interface => ({
    operation1: (): string => 'Subsystem1: Ready!\n',
    operationN: (): string => 'Subsystem1: Go!\n'
})

const Subsystem2 = (): Subsystem2Interface => ({
    operation1: (): string => 'Subsystem2: Get ready!\n',
    operationZ: (): string => 'Subsystem2: Fire!\n'
})

const Facade = (subsystem1: Subsystem1Interface = Subsystem1(), subsystem2: Subsystem2Interface = Subsystem2()): FacadeInterface => ({
    operation: (): string => {
        let result = 'Facade initializes subsystems:\n';
        result += subsystem1.operation1();
        result += subsystem2.operation1();
        result += 'Facade orders subsystems to perform the action:\n';
        result += subsystem1.operationN();
        result += subsystem2.operationZ();

        return result;
    }
})

const clientCode = (facade: FacadeInterface): void => {
    console.log(facade.operation());
}

const main = () => {
    console.log('');

    console.log('Facade Design Pattern');
    console.log('--------------------------');

    const subsystem1 = Subsystem1();
    const subsystem2 = Subsystem2();
    const facade = Facade(subsystem1, subsystem2);
    clientCode(facade);
};

export default main;