interface ContextInterface {
    setStrategy: (strategy: StrategyInterface) => void;
    doSomeBusinessLogic: () => void;
}

interface StrategyInterface {
    doAlgorithm: (data: string[]) => string[];
}

const Context = (data: StrategyInterface) => {
    let strategy: StrategyInterface = data;

    const setStrategy = (newStrategy: StrategyInterface) => {
        strategy = newStrategy;
    };

    const doSomeBusinessLogic = () => {
        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        const result = strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    };

    return {
        setStrategy,
        doSomeBusinessLogic
    }
}

const ConcreteStrategyA = (): StrategyInterface => ({
    doAlgorithm: (data: string[]): string[] => {
        return data.sort();
    }
});

const ConcreteStrategyB = (): StrategyInterface => ({
    doAlgorithm: (data: string[]): string[] => {
        return data.reverse();
    }
});

const main = () => {
    console.log('');

    console.log('Strategy Design Pattern');
    console.log('--------------------------');

    const context: ContextInterface = Context(ConcreteStrategyA());
    console.log('Client: Strategy is set to normal sorting.');
    context.doSomeBusinessLogic();

    console.log('');

    console.log('Client: Strategy is set to reverse sorting.');
    context.setStrategy(ConcreteStrategyB());
    context.doSomeBusinessLogic();
};

export default main;