interface SubjectInterface {
    request: () => void;
};

const RealSubject = (): SubjectInterface => ({
    request: (): void => {
        console.log('RealSubject: Handling request.');
    }
});

const Proxy = (realSubject = RealSubject()): SubjectInterface => {
    const checkAccess = (): boolean => {
        console.log('Proxy: Checking access before forwarding request.');
        return true;
    };

    const logAccess = (): void => {
        console.log('Proxy: Logging the time of request.');
    }

    const request = (): void => {
        if (checkAccess()) {
            realSubject.request();
            logAccess();
        }
    }

    return {
        request
    }
};

const clientCode = (subject: SubjectInterface): void => {
    subject.request();
};

const main = () => {
    console.log('');

    console.log('Proxy Design Pattern');
    console.log('--------------------------');

    console.log('Client: Executing the client code with a real subject:');
    const realSubject = RealSubject();
    clientCode(realSubject);

    console.log('');
    console.log('Client: Executing the client code with a proxy:');
    const proxy = Proxy(realSubject);
    clientCode(proxy);
};

export default main;