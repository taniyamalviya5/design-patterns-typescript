interface HandlerInterface<Request = string, Result = string> {
    setNext: (handler: HandlerInterface<Request, Result>) => HandlerInterface<Request, Result>;
    handle: (request: Request) => Result | null;
};

const AbstractHandler = (): HandlerInterface => {
    let nextHandler: HandlerInterface | null = null;

    const setNext = (handler: HandlerInterface): HandlerInterface => {
        nextHandler = handler;
        return handler;
    };

    const handle = (request: string): string | null => {
        if (nextHandler) {
            return nextHandler.handle(request);
        }
        return null;
    };

    return {
        setNext,
        handle,
    }
};

const MonkeyHandler = (): HandlerInterface => {
    const baseHandler = AbstractHandler();
    return {
        ...baseHandler,
        handle: (request: string): string | null => {
            if (request === 'Banana') {
                return ` Monkey: I'll eat the ${request}.`;
            }
            return baseHandler.handle(request);
        },
    };
};

const SquirrelHandler = (): HandlerInterface => {
    const baseHandler = AbstractHandler();
    return {
        ...baseHandler,
        handle: (request: string): string | null => {
            if (request === 'Nut') {
                return ` Squirrel: I'll eat the ${request}.`;
            }
            return baseHandler.handle(request);
        },
    }
};

const DogHandler = (): HandlerInterface => {
    const baseHandler = AbstractHandler();
    return {
        ...baseHandler,
        handle: (request: string): string | null => {
            if (request === 'MeatBall') {
                return ` Dog: I'll eat the ${request}.`;
            }
            return baseHandler.handle(request);
        },
    }
};

const clientCode = (handler: HandlerInterface): void => {
    const foods = ['Nut', 'Banana', 'Cup of coffee'];

    for (const food of foods) {
        console.log(`Client: Who wants a ${food}?`);
        const result = handler.handle(food);
        if (result) {
            console.log(result);
        } else {
            console.log(` ${food} was left untouched.`);
        }
    }
}

const main = () => {
    console.log('');

    console.log('Chain of Responsibility Design Pattern');
    console.log('-----------------------------------------');

    const monkey = MonkeyHandler();
    const squirrel = SquirrelHandler();
    const dog = DogHandler();

    monkey.setNext(squirrel).setNext(dog);

    console.log('Chain: Monkey > Squirrel > Dog\n');
    clientCode(monkey);
    console.log('');

    console.log('Subchain: Squirrel > Dog\n');
    clientCode(squirrel);
};

export default main;