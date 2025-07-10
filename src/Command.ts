interface CommandInterface {
    execute: () => void;
}

interface ReceiverInterface {
    doSomething: (a: string) => void;
    doSomethingElse: (b: string) => void;
}

const simpleCommand = (payload: string): CommandInterface => ({
    execute: () => {
        console.log(`SimpleCommand: See, I can do simple things like printing (${payload})`);

    },
});

const complexCommand = (receiver: ReceiverInterface, a: string, b: string): CommandInterface => ({
    execute: () => {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        receiver.doSomething(a);
        receiver.doSomethingElse(b);
    },
});

const Receiver = (): ReceiverInterface => ({
    doSomething: (a: string) => {
        console.log(`Receiver: Working on (${a})`);
    },
    doSomethingElse: (b: string) => {
        console.log(`Receiver: Also working on (${b})`);
    },
});

const Invoker = () => {
    let onStart: CommandInterface | null = null;
    let onFinish: CommandInterface | null = null;

    const isCommand = (object: CommandInterface | null) => object?.execute !== undefined;

    return {
        setOnStart: (command: CommandInterface) => {
            onStart = command;
        },
        setOnFinish: (command: CommandInterface) => {
            onFinish = command;
        },
        doSomethingImportant: () => {
            console.log('Invoker: Does anybody want something done before I begin?');

            if (isCommand(onStart)) {
                onStart?.execute();
            }
            console.log('Invoker: ...doing something really important...');

            console.log('Invoker: Does anybody want something done after I finish?');

            if (isCommand(onFinish)) {
                onFinish?.execute();
            }
        },
    };
}

const main = () => {
    console.log('');

    console.log('Command Design Pattern');
    console.log('------------------------');

    const invoker = Invoker();
    invoker.setOnStart(simpleCommand('Say Hi!'));
    const receiver = Receiver();
    invoker.setOnFinish(complexCommand(receiver, 'Send email', 'Save report'));

    invoker.doSomethingImportant();
};

export default main;