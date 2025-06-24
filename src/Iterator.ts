interface Iterator<T> {
    current(): T;
    next(): T;
    key(): number;
    valid(): boolean;
    rewind(): void;
}

interface Aggregator {
    getIterator(): Iterator<string>;
}

interface WordsCollectionInterface {
    getItems(): string[];
    getCount(): number;
    addItem(item: string): void;
    getIterator(): Iterator<string>;
    getReverseIterator(): Iterator<string>;
}

const WordsCollection = (): WordsCollectionInterface => {
    let items: string[] = [];

    const getItems = (): string[] => items;

    const getCount = (): number => items.length;

    const addItem = (item: string): void => {
        items.push(item);
    }

    const getIterator = (): Iterator<string> => {
        return AlphabeticalIterator(WordsCollection());
    }

    const getReverseIterator = (): Iterator<string> => {
        return AlphabeticalIterator(WordsCollection(), true);
    }

    return {
        getItems,
        getCount,
        addItem,
        getIterator,
        getReverseIterator
    }
}

const AlphabeticalIterator = (collection: WordsCollectionInterface, reverse: boolean = false): Iterator<string> => {
    let position: number = 0;

    if (reverse) {
        position = collection.getCount() - 1;
    }

    const rewind = () => {
        position = reverse ? collection.getCount() - 1 : 0;
    }

    const current = (): string => collection.getItems()[position];

    const key = (): number => position;

    const next = (): string => {
        const item = collection.getItems()[position];
        position += reverse ? -1 : 1;
        return item;
    }

    const valid = (): boolean => {
        if (reverse) {
            return position >= 0;
        }
        return position < collection.getCount();
    }

    return {
        current,
        next,
        key,
        valid,
        rewind
    }
}

const main = () => {
    console.log('');

    console.log('Iterator Design Pattern');
    console.log('--------------------------');

    const collection: WordsCollectionInterface = WordsCollection();
    collection.addItem('First');
    collection.addItem('Second');
    collection.addItem('Third');

    const iterator = collection.getIterator();

    console.log('Straight traversal:');
    while (iterator.valid()) {
        console.log(`Item: ${iterator.next()}`);
    }

    console.log('');
    console.log('Reverse traversal:');
    const reverseIterator = collection.getReverseIterator();
    while (reverseIterator.valid()) {
        console.log(`Item: ${reverseIterator.next()}`);
    }
}

export default main;