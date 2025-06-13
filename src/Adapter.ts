interface TargetInterface {
    request(): string;
}

interface AdapteeInterface {
    specificRequest(): string;
}

type AdapterInterface = TargetInterface;;

const target = (): TargetInterface => {
    return {
        request: () => 'Target: the default behavior'
    };
};

const adaptee = (): AdapteeInterface => {
    return {
        specificRequest: () => '.eetpadA eht fo roivaheb laicepS'
    };
};

const adapter = (adaptee: AdapteeInterface): AdapterInterface => {
    return {
        request: () => adaptee.specificRequest().split('').reverse().join(''),
        // Reverse the specificRequest output to match the Target's request format
    };
};

const clientCode = (target: TargetInterface) => {
    console.log(target.request());
};

const main = () => {
    console.log('Client: I can work just fine with the Target objects:');
    const targetInstance = target();
    clientCode(targetInstance);

    console.log('');
    console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
    const adapteeInstance = adaptee();
    console.log(`Adaptee: ${adapteeInstance.specificRequest()}`);

    console.log('');
    console.log('Client: But I can work with it via the Adapter:');
    const adapterInstance = adapter(adapteeInstance);
    clientCode(adapterInstance);
};

export default main;
