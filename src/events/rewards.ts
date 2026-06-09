import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge"; // ES Modules import
// import "@aws-sdk/signature-v4a";
// const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge"); // CommonJS import
// import type { EventBridgeClientConfig } from "@aws-sdk/client-eventbridge";


export const publisher = async () => {
    const config = {
        region: "eu-west-3"
    }; // type is EventBridgeClientConfig
    const client = new EventBridgeClient(config);
    const input = {
        Entries: [ // PutEventsRequestEntryList // required
            { // PutEventsRequestEntry
                Source: "Pokedex",
                DetailType: "pokemon-created",
                Detail: "Successfully processed PokemonCreated event from PokedexService!",
                EventBusName: "pokedexBus",
            },
        ],
        // EndpointId: "ww0puoelrc",
    };
    const command = new PutEventsCommand(input);
    const response = await client.send(command);
    console.log("********************************");
    console.log(response);
    console.log("********************************");
// { // PutEventsResponse
//   FailedEntryCount: Number("int"),
//   Entries: [ // PutEventsResultEntryList
//     { // PutEventsResultEntry
//       EventId: "STRING_VALUE",
//       ErrorCode: "STRING_VALUE",
//       ErrorMessage: "STRING_VALUE",
//     },
//   ],
// };

}
