interface ComponentInterface {
    setParent: (parent: ComponentInterface | null) => void;
    getParent: () => ComponentInterface | null;
    add: (component: ComponentInterface) => void;
    remove: (component: ComponentInterface) => void;
    isComposite: () => boolean;
    operation: () => string;
};

const Component = (): ComponentInterface => {
    let parent: ComponentInterface | null;

    return {
        setParent: (parentParam) => (parent = parentParam),
        getParent: () => parent,
        add: (component: ComponentInterface) => { },
        remove: (component: ComponentInterface) => { },
        isComposite: () => false,
        operation: (): string => 'Operation'
    }
};

const Leaf = () => ({
    ...Component(),
    operation: () => 'Leaf',
});

const Main = () => {
    const children: ComponentInterface[] = [];

    const add = (child: ComponentInterface): void => {
        children.push(child);
        child.setParent(child);
    }

    const remove = (child: ComponentInterface): void => {
        const componentIndex = children.indexOf(child);
        children.splice(componentIndex, 1);

        child.setParent(null);
    }

    const isComposite = (): boolean => true;

    const operation = (): string => {
        const results = [];
        for (const child of children) {
            results.push(child.operation());
        }

        return `Branch (${results.join(' + ')})`;
    }

    return {
        ...Component(),
        add,
        remove,
        operation,
        isComposite,
    }
};

const clientCode = (component: ComponentInterface) => console.log(`RESULT: ${component.operation()}`);

const clientCode2 = (component1: ComponentInterface, component2: ComponentInterface) => {
    if (component1.isComposite()) {
        component1.add(component2);
    }

    console.log(`RESULT: ${component1.operation()}`)
};

const Composite = () => {
    console.log('');

    const simple = Leaf();
    console.log('Client: I\'ve got a simple component:');
    clientCode(simple);
    console.log('');

    const tree = Main();
    const branch1 = Main();
    branch1.add(Leaf());
    branch1.add(Leaf());
    const branch2 = Main();
    branch2.add(Leaf());
    tree.add(branch1);
    tree.add(branch2);
    console.log('Client: Now I\'ve got a composite tree:');
    clientCode(tree);
    console.log('');

    console.log('Client: I don\'t need to check the components classes even when managing the tree:');
    clientCode2(tree, simple);
};

export default Composite;