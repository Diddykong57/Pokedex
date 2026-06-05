export const USER_ITEM = {
    PK_PREFIX: "USER",
    NAME: "USER",
    PROFILE: {
        SK: "PROFILE",
        GSI1PK: "POKEMON",
        ENTITY_TYPE: "USER_PROFILE",
    },
    POKEMON: {
        SK: "POKEMON",
        ENTITY_TYPE: "POKEMON_STATS",
    },
} as const;
