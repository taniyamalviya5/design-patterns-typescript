interface MementoInterface {
    getState: () => string;
    getName: () => string;
    getDate: () => string;
}

interface OriginatorInterface {
    doSomething: () => void;
    generateRandomString: (length?: number) => string;
    save: () => MementoInterface;
    restore: (memento: MementoInterface) => void;
}

const ConcreteMemento = (state: string): MementoInterface => {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const getState = (): string => state;

    const getName = (): string => `${date} / (${state?.substring(0, 9)})....`;

    const getDate = (): string => date;

    return {
        getState,
        getName,
        getDate
    }
}

const Originator = (stateData: string): OriginatorInterface => {
    let state: string = stateData;

    console.log(`Originator: My initial state is: ${state}`);

    const generateRandomString = (length: number = 10): string => {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array
            .from({ length })
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length))).join('');
    }

    const doSomething = (): void => {
        console.log('Originator: I\'m doing something important.');
        state = generateRandomString(30);
        console.log(`Originator: and my state has changed to: ${state}`);
    }

    const save = (): MementoInterface => (ConcreteMemento(state));

    const restore = (memento: MementoInterface): void => {
        state = memento.getState();
        console.log(`Originator: My state has been restored to: ${state}`);
    }

    return {
        doSomething,
        generateRandomString,
        save,
        restore
    }

}

const Caretaker = (originator: OriginatorInterface) => {
    let mementos: MementoInterface[] = [];

    const backup = (): void => {
        console.log('\nCaretaker: Saving Originator\'s state...');
        mementos.push(originator.save());
    }

    const undo = (): void => {
        if (!mementos.length) return;

        const memento = mementos.pop();

        console.log(`Caretaker: Restoring state to: ${memento!.getName()}`);
        originator.restore(memento!);
    }

    const showHistory = (): void => {
        console.log('\nCaretaker: Here\'s the list of mementos:');
        for (const memento of mementos) {
            console.log(memento.getName());
        }
    }

    return {
        backup,
        undo,
        showHistory
    }
}

const main = () => {
    console.log('');

    console.log('Memento Design Pattern');
    console.log('--------------------------');

    const originator = Originator('Super-duper-super-puper-super.');
    const caretaker = Caretaker(originator);

    caretaker.backup();
    originator.doSomething();

    caretaker.backup();
    originator.doSomething();

    console.log('');
    caretaker.showHistory();

    console.log('\nClient: Now, let\'s rollback!\n');
    caretaker.undo();

    console.log('\nClient: Once more!\n');
    caretaker.undo();
};

export default main;