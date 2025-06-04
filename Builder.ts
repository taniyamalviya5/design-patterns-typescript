interface BuilderInterface {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
    getProduct(): { parts: string[], listParts: () => void };
}

const Product1 = () => {
    const parts: string[] = [];
    const listParts = () => {
        console.log(`Product parts: ${parts.join(", ")}`);
    };

    return {
        parts,
        listParts
    };
};

const concreteBuilder1 = (): BuilderInterface => {
    let product = Product1();

    const reset = () => {
        product = Product1();
    };

    reset();

    const producePartA = () => {
        product.parts.push("PartA1");
    };
    const producePartB = () => {
        product.parts.push("PartB1");
    }
    const producePartC = () => {
        product.parts.push("PartC1");
    }

    const getProduct = () => {
        const result = product;
        reset();
        return result;
    }

    return {
        producePartA,
        producePartB,
        producePartC,
        getProduct
    }
};

const Director = () => {
    let builder: BuilderInterface;
    const setBuilder = (newBuilder: BuilderInterface) => {
        builder = newBuilder;
    }
    const buildMinimalViableProduct = () => {
        builder.producePartA();
    }
    const buildFullFeaturedProduct = () => {
        builder.producePartA();
        builder.producePartB();
        builder.producePartC();
    }
    return {
        setBuilder,
        buildMinimalViableProduct,
        buildFullFeaturedProduct,
    }
};

const Builder = () => {
    const builder = concreteBuilder1();
    const director = Director();

    director.setBuilder(builder);

    console.log("Building minimal viable product:");
    director.buildMinimalViableProduct();
    const product1 = builder.getProduct();
    product1.listParts();

    console.log("Building full featured product:");
    director.buildFullFeaturedProduct();
    const product2 = builder.getProduct();
    product2.listParts();

    // Remember, the Builder pattern can be used without a Director.
    console.log('Custom product:');
    builder.producePartA();
    builder.producePartC();
    const customProduct = builder.getProduct();
    customProduct.listParts();

};

export default Builder;