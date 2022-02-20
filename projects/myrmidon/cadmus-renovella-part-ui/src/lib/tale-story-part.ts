import { Part } from "@myrmidon/cadmus-core";
import { HistoricalDateModel } from "@myrmidon/cadmus-refs-historical-date";

/**
 * A character in a story.
 */
export interface StoryCharacter {
  name?: string;
  sex?: string;
  role: string;
  isGroup?: boolean;
}

/**
 * The place of a story.
 */
export interface StoryPlace {
  type: string;
  name?: string;
  location?: string;
}

/**
 * The tale story part model.
 */
export interface TaleStoryPart extends Part {
  summary: string;
  prologue?: string;
  epilogue?: string;
  characters: StoryCharacter[];
  age?: string;
  date?: HistoricalDateModel;
  places: StoryPlace[];
}

/**
 * The type ID used to identify the TaleStoryPart type.
 */
export const TALE_STORY_PART_TYPEID = 'it.vedph.renovella.tale-story';

/**
 * JSON schema for the TaleStory part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const TaleStory_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/renovella/' + TALE_STORY_PART_TYPEID + '.json',
  type: 'object',
  title: 'TaleStoryPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'summary',
    'characters',
    'places',
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    creatorId: {
      type: 'string',
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    userId: {
      type: 'string',
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$',
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$',
    },
    summary: {
      type: 'string',
    },
    prologue: {
      type: 'string',
    },
    epilogue: {
      type: 'string',
    },
    characters: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['role'],
            properties: {
              name: {
                type: 'string',
              },
              sex: {
                type: 'string',
              },
              role: {
                type: 'string',
              },
              isGroup: {
                type: 'boolean',
              },
            },
          },
        ],
      },
    },
    age: {
      type: 'string'
    },
    date: {
      type: 'object',
      required: ['a'],
      properties: {
        a: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer',
            },
            isCentury: {
              type: 'boolean',
            },
            isSpan: {
              type: 'boolean',
            },
            isApproximate: {
              type: 'boolean',
            },
            isDubious: {
              type: 'boolean',
            },
            day: {
              type: 'integer',
            },
            month: {
              type: 'integer',
            },
            hint: {
              type: ['string', 'null'],
            },
          },
        },
        b: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer',
            },
            isCentury: {
              type: 'boolean',
            },
            isSpan: {
              type: 'boolean',
            },
            isApproximate: {
              type: 'boolean',
            },
            isDubious: {
              type: 'boolean',
            },
            day: {
              type: 'integer',
            },
            month: {
              type: 'integer',
            },
            hint: {
              type: ['string', 'null'],
            },
          },
        },
      },
    },
    places: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              location: {
                type: 'string',
              },
            },
          },
        ],
      },
    },
  },
};
