const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const mongoose = require("mongoose");
const { serializeInteger } = require("whatwg-url");

mongoose.connect('mongodb://localhost:27017/vegetables');

const id = mongoose.Types.ObjectId();
// console.log(id)

const Veg = mongoose.model("Veg",
    {
        name: {
            type: String,
            unique: true,
            required: true
        }

    }
);

const Fruits = mongoose.model('Fruits',
    {
        name: {
            type: String,
            required: true,
            unique: true
        }

    }
);

const addVeg = async (name) => {
    const veg = new Veg({ name: name });
    console.log(veg);
    await veg.save();
    process.exit();
};

const addFruit = async (name) => {
    const fruit = new Fruits({ name: name });
    console.log(fruit);
    await fruit.save();
    process.exit();
};

const findAllFruits = async () => {
    const item = await Fruits.find();
    console.log(item);
    process.exit();
};

const findAllVeg = async () => {
    const item = await Veg.find();
    console.log(item);
    process.exit();
};
findOneVeg = async (name) => {
    const item = await Veg.find({ name: name });
    console.log(item);
    process.exit();
};
findOneFruit = async (name) => {
    const item = await Fruits.find({ name: name });
    console.log(item);
    process.exit();
};
updateVeg = async (name, newName) => {
    const item = await Veg.updateOne({ name: name }, { name: newName });
    console.log(item);
    process.exit();
};
updateFruit = async (name, newName) => {
    const item = await Fruits.updateOne({ name: name }, { name: newName });
    console.log(item);
    process.exit();
};

deleteOneVeg = async (name) => {
    const item = await Veg.deleteOne({ name: name });
    console.log("Veg has been deleted");
    process.exit();
}
deleteOneFruit = async (name) => {
    const item = await Fruits.deleteOne({ name: name });
    console.log("Fruit has been deleted");
    process.exit();
}
deleteAllFruit = async () => {
    const item = await Fruits.deleteMany();
    console.log("All fruits have been deleted");
    process.exit();
}
deleteAllVeg = async () => {
    const item = await Veg.deleteMany();
    console.log("All vegs have been deleted");
    process.exit();
}
const main = async (argv) => {
    try {
        if (argv.addVeg) {
            await addVeg(argv.name);
        } else if (argv.addFruit) {
            await addFruit(argv.name);
        } else if (argv.findAllFruits) {
            await findAllFruits(argv.Fruits);
        } else if (argv.findAllVeg) {
            await findAllVeg(argv.veg);
        } else if (argv.findOneVeg) {
            await findOneVeg(argv.name);
        } else if (argv.findOneFruit) {
            await findOneFruit(argv.name);
        } else if (argv.deleteOneVeg) {
            await deleteOneVeg(argv.name)
        } else if (argv.deleteOneFruit) {
            await deleteOneFruit(argv.name)
        } else if (argv.deleteAllVeg) {
            await deleteAllVeg(argv.name)
        } else if (argv.deleteAllFruit) {
            await deleteAllFruit(argv.name)
        } else if (argv.updateVeg) {
            await updateVeg(argv.name, argv.newName)
        } else if (argv.updateFruit) {
            await updateFruit(argv.name, argv.newName)
        }
    } catch (error) {
        console.log(error);
    }
};

main(argv);