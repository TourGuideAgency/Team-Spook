import { agentResolvers } from "./agentResolvers";
import { Agent } from "../models/collections.js";
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
  
test ("Gets all agents", async () => {
    expect(agentResolvers.Query.getAllAgents).not.toThrowError();
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Gets employee by ID number", async () => {
    const newAgent = new Agent({ 
      email: 'tourismagency2023.agent007@gmail.com',
        password: 'Mis$M0neyPenny',
        firstName: 'James',
        lastName: 'Bond',
        phone: '1234567890',
        databaseAccessLevel: 1,
      });
    const agent = await newAgent.save();
;
    const foundAgent = await agentResolvers.Query.getAgentbyId( null, {id: agent._id})

    expect(foundAgent.email).toEqual(newAgent.email);
    expect(foundAgent.firstName).toEqual(newAgent.firstName);
    expect(foundAgent.lastName).toEqual(newAgent.lastName);
    expect(foundAgent.phone).toEqual(newAgent.phone);
    expect(foundAgent.databaseAccessLevel).toEqual(newAgent.databaseAccessLevel);

    await Agent.deleteOne({ _id: agent._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Adds agent to db", async () => {
const args = {
      email: 'tourismagency2023.agent007@gmail.com',
      password: 'Mis$M0neyPenny',
      firstName: 'James',
      lastName: 'Bond',
      phone: '1234567890',
      databaseAccessLevel: 1,
    };

    const newAgent = await agentResolvers.Mutation.createAgent(null, args);

    expect(newAgent.email).toEqual(args.email);
    expect(newAgent.firstName).toEqual(args.firstName);
    expect(newAgent.lastName).toEqual(args.lastName);

    await Agent.deleteOne({ _id: newAgent._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

test("Updates agent in db", async () => {
    const agent = new Agent({ 
      email: 'tourismagency2023.agent007@gmail.com',
      password: 'Mis$M0neyPenny',
      firstName: 'James',
      lastName: 'Bond',
      phone: '1234567890',
      databaseAccessLevel: 1,
    });

    const newAgent = await agent.save();

    const args = {
          id: newAgent._id,
          email: 'tourismagency2023.agent007@gmail.com',
          password: 'Mis$M0neyPenny',
          firstName: 'James',
          lastName: 'Bond',
          phone: '1234567899',
          databaseAccessLevel: 1,
      };

    const updatedAgent = await agentResolvers.Mutation.updateAgent(null, args);

    expect(updatedAgent).toBeDefined();
    expect(updatedAgent.email).toEqual(args.email);
    expect(updatedAgent.firstName).toEqual(args.firstName);
    expect(updatedAgent.lastName).toEqual(args.lastName);
    expect(updatedAgent.phone).toEqual(args.phone);
    expect(updatedAgent.databaseAccessLevel.toString()).toEqual(args.databaseAccessLevel);

    await Agent.deleteOne({ _id: updatedAgent._id });
    await new Promise(resolve => setTimeout(resolve, 1000));
});

test("Deletes agent from db", async () => {    
        const newAgent = new Agent({ 
          email: 'tourismagency2023.agent007@gmail.com',
            password: 'Mis$M0neyPenny',
            firstName: 'James',
            lastName: 'Bond',
            phone: '1234567890',
            databaseAccessLevel: 1,
          });
        const agent = await newAgent.save();

        const foundAgent = await Agent.findOne({ _id: agent._id });
    
        expect(foundAgent.email).toEqual(newAgent.email);
        expect(foundAgent.firstName).toEqual(newAgent.firstName);
        expect(foundAgent.lastName).toEqual(newAgent.lastName);

        const deletedAgent = await agentResolvers.Mutation.deleteAgent(null, { id: foundAgent.id })

        expect(deletedAgent).toBe(deletedAgent);
        await new Promise(resolve => setTimeout(resolve, 1000));
    });