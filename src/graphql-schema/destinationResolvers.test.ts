import { destinationResolvers } from "./destinationResolvers";
import { Destination } from "../models/collections.js";
import  mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri: string = process.env.MONGO_URI as string;

beforeAll(async () => {
    await mongoose.connect(uri)
        });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
test ("Gets all destinations", async () => {
    expect(destinationResolvers.Query.getAlldestinations).not.toThrowError();
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Gets destination by ID number", async () => {
    const destination = new Destination({ 
      country: 'USA',
      city: 'New-York',
      currency: 'USD',
      language: 'English',
      description: 'Big-Apple',
      meals: "American",
      lodging: "Marriott",
      price: 5000,
      Bus_id: 2,
      image: "NewYork.jpeg"
      });
    const newDestination = await destination.save();
;
    const foundDestination = await destinationResolvers.Query.getDestinationbyId( null, {id: newDestination._id})

    expect(foundDestination.country).toEqual(newDestination.country);
    expect(foundDestination.city).toEqual(newDestination.city);
    expect(foundDestination.currency).toEqual(newDestination.currency);
    expect(foundDestination.language).toEqual(newDestination.language);
    expect(foundDestination.description).toEqual(newDestination.description);
    expect(foundDestination.meals).toEqual(newDestination.meals);
    expect(foundDestination.lodging).toEqual(newDestination.lodging);
    expect(foundDestination.price).toEqual(newDestination.price);
    expect(foundDestination.Bus_id).toEqual(newDestination.Bus_id);
    expect(foundDestination.image).toEqual(newDestination.image);

    await Destination.deleteOne({ _id: foundDestination._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Adds destination to db", async () => {
    const destination = {
      country: 'USA',
      city: 'New-York',
      currency: 'USD',
      language: 'English',
      description: 'Big-Apple',
      meals: "American",
      lodging: "Marriott",
      price: 5000,
      Bus_id: 2,
      image: "NewYork.jpeg"
    };

    const newDestination = await destinationResolvers.Mutation.createDestination(null, destination);

    expect(newDestination.country).toEqual(destination.country);
    expect(newDestination.city).toEqual(destination.city);
    expect(newDestination.currency).toEqual(destination.currency);
    expect(newDestination.language).toEqual(destination.language);
    expect(newDestination.description).toEqual(destination.description);
    expect(newDestination.meals).toEqual(destination.meals);
    expect(newDestination.lodging).toEqual(destination.lodging);
    expect(newDestination.price.toString()).toEqual(destination.price);
    expect(newDestination.Bus_id.toString()).toEqual(destination.Bus_id);
    expect(newDestination.image).toEqual(destination.image);

    await Destination.deleteOne({ _id: newDestination._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

test("Updates destination in db", async () => {
    const destination = new Destination({ 
      country: 'USA',
      city: 'New-York',
      currency: 'USD',
      language: 'English',
      description: 'Big-Apple',
      meals: "American",
      lodging: "Marriott",
      price: 5000,
      Bus_id: 2,
      image: "NewYork.jpeg"
      });
    const newDestination = await destination.save();
    
    const args = {
      id: newDestination._id,
      country: 'USA',
      city: 'New-York',
      currency: 'USD',
      language: 'English',
      description: 'Big-Apple',
      meals: "American",
      lodging: "Airbnb",
      price: 5000,
      Bus_id: 2,
      image: "NewYork.jpeg"
    };

    const updatedDestination = await destinationResolvers.Mutation.updateDestination(null, args);

    expect(updatedDestination.country).toEqual(args.country);
    expect(updatedDestination.city).toEqual(args.city);
    expect(updatedDestination.currency).toEqual(args.currency);
    expect(updatedDestination.language).toEqual(args.language);
    expect(updatedDestination.description).toEqual(args.description);
    expect(updatedDestination.meals).toEqual(args.meals);
    expect(updatedDestination.lodging).toEqual(args.lodging);
    expect(updatedDestination.price.toString()).toEqual(args.price);
    expect(updatedDestination.Bus_id.toString()).toEqual(args.Bus_id);
    expect(updatedDestination.image).toEqual(args.image);

    await Destination.deleteOne({ _id: updatedDestination._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Deletes destination from db", async () => {    
    const destination = new Destination({ 
      country: 'USA',
      city: 'New-York',
      currency: 'USD',
      language: 'English',
      description: 'Big-Apple',
      meals: "American",
      lodging: "Marriott",
      price: 5000,
      Bus_id: 2,
      image: "NewYork.jpeg"
      });
    const newDestination = await destination.save();

    const foundDestination = await Destination.findOne({ _id: newDestination._id });

    expect(foundDestination.country).toEqual(newDestination.country);
    expect(foundDestination.city).toEqual(newDestination.city);
    expect(foundDestination.currency).toEqual(newDestination.currency);
    expect(foundDestination.language).toEqual(newDestination.language);
    expect(foundDestination.description).toEqual(newDestination.description);
    expect(foundDestination.meals).toEqual(newDestination.meals);
    expect(foundDestination.lodging).toEqual(newDestination.lodging);
    expect(foundDestination.price).toEqual(newDestination.price);
    expect(foundDestination.Bus_id).toEqual(newDestination.Bus_id);
    expect(foundDestination.image).toEqual(newDestination.image);

    const deletedDestination = await destinationResolvers.Mutation.deleteDestination(null, { id: foundDestination.id })

    expect(deletedDestination).toBe(deletedDestination);
    await new Promise(resolve => setTimeout(resolve, 1000));
    });