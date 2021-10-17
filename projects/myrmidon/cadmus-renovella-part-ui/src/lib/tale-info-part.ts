import { HistoricalDateModel, Part } from '@myrmidon/cadmus-core';
import { CitedPerson } from './cited-persons-part';

/**
 * The tale info part model.
 */
export interface TaleInfoPart extends Part {
  collectionId?: string;
  containerId?: string;
  ordinal?: number;
  title: string;
  author?: CitedPerson;
  dedicatee?: CitedPerson;
  place: string;
  date: HistoricalDateModel;
  language: string;
  genres: string[];
  rubric?: string;
  incipit?: string;
  explicit?: string;
  narrator?: string;
}

/**
 * The type ID used to identify the TaleInfoPart type.
 */
export const TALE_INFO_PART_TYPEID = 'it.vedph.renovella.tale-info';

/**
 * JSON schema for the TaleInfo part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const TALE_INFO_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.vedph.it/cadmus/parts/renovella/' + TALE_INFO_PART_TYPEID + '.json',
  type: 'object',
  title: 'TaleInfoPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'title',
    'place',
    'date',
    'language',
    'genres',
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
    collectionId: {
      type: 'string',
    },
    containerId: {
      type: 'string',
    },
    ordinal: {
      type: 'integer',
    },
    title: {
      type: 'string',
    },
    author: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'object',
          required: ['language', 'parts'],
          properties: {
            language: {
              type: 'string',
            },
            tag: {
              type: 'string',
            },
            parts: {
              type: 'array',
              items: {
                anyOf: [
                  {
                    type: 'object',
                    required: ['type', 'value'],
                    properties: {
                      type: {
                        type: 'string',
                      },
                      value: {
                        type: 'string',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        ids: {
          type: 'array',
          items: {
            anyOf: [
              {
                type: 'string',
              },
            ],
          },
        },
        sources: {
          type: 'array',
          items: {
            anyOf: [
              {
                type: 'object',
                required: ['citation', 'work'],
                properties: {
                  tag: {
                    type: 'string',
                  },
                  type: {
                    type: 'string',
                  },
                  citation: {
                    type: 'string',
                  },
                  note: {
                    type: 'string',
                  },
                },
              },
            ],
          },
        },
      },
    },
    place: {
      type: 'string',
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
    language: {
      type: 'string',
    },
    genres: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'string',
          },
        ],
      },
    },
    dedicatee: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'object',
          required: ['language', 'parts'],
          properties: {
            language: {
              type: 'string',
            },
            tag: {
              type: 'string',
            },
            parts: {
              type: 'array',
              items: {
                anyOf: [
                  {
                    type: 'object',
                    required: ['type', 'value'],
                    properties: {
                      type: {
                        type: 'string',
                      },
                      value: {
                        type: 'string',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        ids: {
          type: 'array',
          items: {
            anyOf: [
              {
                type: 'string',
              },
            ],
          },
        },
        sources: {
          type: 'array',
          items: {
            anyOf: [
              {
                type: 'object',
                required: ['citation'],
                properties: {
                  tag: {
                    type: 'string',
                  },
                  type: {
                    type: 'string',
                  },
                  citation: {
                    type: 'string',
                  },
                  note: {
                    type: 'string',
                  },
                },
              },
            ],
          },
        },
      },
    },
    rubric: {
      type: 'string',
    },
    incipit: {
      type: 'string',
    },
    explicit: {
      type: 'string',
    },
    narrator: {
      type: 'string',
    },
  },
};
