const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const db = require("../../db");

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: {
    id: { type: GraphQLString },
    date: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

const AddEventMutation = {
  type: EventType,
  args: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { date, title }) {
    try {
      const result = await db.query(
        "INSERT INTO events (date, title) VALUES ($1, $2) RETURNING *",
        [date, title]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Error saving event: " + error.message);
    }
  },
};

module.exports = AddEventMutation;
