const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const db = require("../../db");

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: {
    id: { type: GraphQLString },
    date: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

const AddEventMutation = {
  type: EventType,
  args: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { date, name }) {
    try {
      const result = await db.query(
        "INSERT INTO events (date, name) VALUES ($1, $2) RETURNING *",
        [date, name]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error saving event: " + error.message);
    }
  },
};

module.exports = AddEventMutation;
