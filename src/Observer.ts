interface ObserverInterface {
    update: (subject: SubjectInterface) => void;
}

interface SubjectInterface {
    attach: (observer: ObserverInterface) => void;
    detach: (observer: ObserverInterface) => void;
    notify: () => void;
    someBusinessLogic: () => void;
    state: number;
}

const ConcreteSubject = (): SubjectInterface => {
    let state: number = 0;
    let observers: ObserverInterface[] = [];

    const attach = (observer: ObserverInterface): void => {
        const isExist = observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        console.log('Subject: Attached an observer.');
        observers.push(observer);
    }

    const detach = (observer: ObserverInterface): void => {
        const observerIndex = observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    const notify = (): void => {
        console.log('Subject: Notifying observers...');

        for (const observer of observers) {
            observer.update({ ...ConcreteSubject(), state });
        }
    }

    const someBusinessLogic = (): void => {
        console.log('\nSubject: I\'m doing something important.');
        state = Math.floor(Math.random() * (10 + 1));

        console.log(`Subject: My state has just changed to: ${state}`);
        notify();
    }


    return {
        attach,
        detach,
        notify,
        someBusinessLogic,
        state
    }
}

const ConcreteObserverA = (): ObserverInterface => ({
    update: (subject: SubjectInterface): void => {
        if (subject.state < 3) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    }
});

const ConcreteObserverB = (): ObserverInterface => ({
    update: (subject: SubjectInterface): void => {
        if (subject.state === 0 || subject.state >= 2) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    }
});

const main = () => {
    console.log('');

    console.log('Observer Design Pattern');
    console.log('--------------------------');

    const subject = ConcreteSubject();

    const observer1 = ConcreteObserverA();
    subject.attach(observer1);

    const observer2 = ConcreteObserverB();
    subject.attach(observer2);

    subject.someBusinessLogic();
    subject.someBusinessLogic();

    subject.detach(observer2);

    subject.someBusinessLogic();
};

export default main;