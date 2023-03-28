import { sanitize } from "./../utils/sanitize.js";
import { Guide } from "../models/collections.js";
import { ErrorHandling } from "../utils/ErrorHandling/ErrorHandling.js";
import { ManageQueryAnswer } from "../utils/ErrorHandling/typesErrors/NotFoundErrorHandling.js";
export const guideResolvers = {
    Query: {
        getAllguides: async () => {
            try {
                const guides = await Guide.find();
                return ManageQueryAnswer(guides, "guides");
            }
            catch (error) {
                ErrorHandling(error);
            }
        },
        getGuidebyId: async (_, args) => {
            try {
                const guide = await Guide.findById(args.id);
                return ManageQueryAnswer(guide, "Bus");
            }
            catch (error) {
                ErrorHandling(error);
            }
        },
    },
    Mutation: {
        createGuide: async (_, args) => {
            const sanitizedArgs = sanitize(args);
            const { firstName, lastName, email, phone, languages, databaseAccessLevel } = sanitizedArgs;
            const newCostumer = new Guide({ firstName, lastName, email, phone, languages, databaseAccessLevel });
            await newCostumer.save();
            return newCostumer;
        },
        updateGuide: async (_, args) => {
            const sanitizedArgs = sanitize(args);
            const { id, firstName, lastName, email, phone, languages, databaseAccessLevel } = sanitizedArgs;
            return await Guide.findByIdAndUpdate(id, { $set: { firstName, lastName, email, phone, languages, databaseAccessLevel } }, { new: true });
        },
        deleteGuide: async (_, args) => {
            try {
                const guideDeleted = await Guide.findByIdAndDelete(args.id);
                const Answer = guideDeleted && `Bus deleted succesfully : ${guideDeleted}`;
                return ManageQueryAnswer(Answer, "Guide");
            }
            catch (error) {
                ErrorHandling(error);
            }
        },
    },
};
