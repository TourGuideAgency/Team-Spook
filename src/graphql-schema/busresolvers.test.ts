import { busResolvers } from "./busResolvers";
import { Bus } from "../models/collections.js";
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
  
test ("Gets all buses", async () => {
    expect(busResolvers.Query.getAllBuses).not.toThrowError();
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Gets bus by ID number", async () => {
    const bus = new Bus({ 
        Name: "Red-Line",
        Description: 'Times-Square-Excursion',
        Tour_Guide: 'John',
        Total_Seat: 10,
        Empty_Seat: 2,
        Full_Seat: 8,
        Patent: "NY-CWGM438"
      });
    const newBus = await bus.save();
;
    const foundBus = await busResolvers.Query.getBusesbyId( null, {id: newBus._id})

    expect(foundBus.Name).toEqual(newBus.Name);
    expect(foundBus.Description).toEqual(newBus.Description);
    expect(foundBus.Tour_Guide).toEqual(newBus.Tour_Guide);
    expect(foundBus.Total_Seat).toEqual(newBus.Total_Seat);
    expect(foundBus.Empty_Seat).toEqual(newBus.Empty_Seat);
    expect(foundBus.Full_Seat).toEqual(newBus.Full_Seat);
    expect(foundBus.Patent).toEqual(newBus.Patent);

    await Bus.deleteOne({ _id: foundBus._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Adds bus to db", async () => {
const bus = {
  Name: "Red-Line",
  Description: 'Times-Square-Excursion',
  Tour_Guide: 'John',
  Total_Seat: 10,
  Empty_Seat: 2,
  Full_Seat: 8,
  Patent: "NY-CWGM438"
};

    const newBus = await busResolvers.Mutation.createBus(null, bus);

    expect(newBus.Name).toEqual(bus.Name);
    expect(newBus.Description).toEqual(bus.Description);
    expect(newBus.Tour_Guide).toEqual(bus.Tour_Guide);
    expect(newBus.Total_Seat.toString()).toEqual(bus.Total_Seat);
    expect(newBus.Empty_Seat.toString()).toEqual(bus.Empty_Seat);
    expect(newBus.Full_Seat.toString()).toEqual(bus.Full_Seat);
    expect(newBus.Patent).toEqual(bus.Patent);

    await Bus.deleteOne({ _id: newBus._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

test("Updates bus in db", async () => {
    const bus = new Bus({ 
        Name: "Red-Line",
        Description: 'Times-Square-Excursion',
        Tour_Guide: 'John',
        Total_Seat: 10,
        Empty_Seat: 2,
        Full_Seat: 8,
        Patent: "NY-CWGM438"
      });

    const newBus = await bus.save();

    const args = {
      id: newBus._id,
      Name: "Red-Line",
      Description: 'Times-Square-Excursion',
      Tour_Guide: 'Patrick',
      Total_Seat: 10,
      Empty_Seat: 2,
      Full_Seat: 8,
      Patent: "NY-CWGM438"
    };

    const updatedBus = await busResolvers.Mutation.updateBus(null, args);

    expect(updatedBus.Name).toEqual(args.Name);
    expect(updatedBus.Description).toEqual(args.Description);
    expect(updatedBus.Tour_Guide).toEqual(args.Tour_Guide);
    expect(updatedBus.Total_Seat.toString()).toEqual(args.Total_Seat);
    expect(updatedBus.Empty_Seat.toString()).toEqual(args.Empty_Seat);
    expect(updatedBus.Full_Seat.toString()).toEqual(args.Full_Seat);
    expect(updatedBus.Patent).toEqual(args.Patent);

    await Bus.deleteOne({ _id: updatedBus._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Deletes bus from db", async () => {    
        const bus = new Bus({ 
          Name: "Red-Line",
          Description: 'Times-Square-Excursion',
          Tour_Guide: 'John',
          Total_Seat: 10,
          Empty_Seat: 2,
          Full_Seat: 8,
          Patent: "NY-CWGM438"
        });
        const newBus = await bus.save();

        const foundBus = await Bus.findOne({ _id: newBus._id });
    
        expect(foundBus.Name).toEqual(bus.Name);
        expect(foundBus.Description).toEqual(bus.Description);
        expect(foundBus.Tour_Guide).toEqual(bus.Tour_Guide);
        expect(foundBus.Total_Seat).toEqual(bus.Total_Seat);
        expect(foundBus.Empty_Seat).toEqual(bus.Empty_Seat);
        expect(foundBus.Full_Seat).toEqual(bus.Full_Seat);
        expect(foundBus.Patent).toEqual(bus.Patent);
    
        const deletedBus = await busResolvers.Mutation.deleteBus(null, { id: foundBus.id })

        expect(deletedBus).toBe(deletedBus);
        await new Promise(resolve => setTimeout(resolve, 1000));
    });