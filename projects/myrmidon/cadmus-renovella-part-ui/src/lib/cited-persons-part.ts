import { Part } from '@myrmidon/cadmus-core';
import { DecoratedId } from '@myrmidon/cadmus-refs-decorated-ids';
import { DocReference } from '@myrmidon/cadmus-refs-doc-references';
import { ProperName } from '@myrmidon/cadmus-refs-proper-name';

export interface CitedPerson {
  ids?: DecoratedId[];
  sources?: DocReference[];
  name: ProperName;
  rank?: number;
}

/**
 * The cited persons part model.
 */
export interface CitedPersonsPart extends Part {
  persons: CitedPerson[];
}

/**
 * The type ID used to identify the CitedPersonsPart type.
 */
export const CITED_PERSONS_PART_TYPEID = 'it.vedph.renovella.cited-persons';

/**
 * JSON schema for the CitedPersons part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const CITED_PERSONS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/renovella/' +
    CITED_PERSONS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'CitedPersonsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'persons',
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

    persons: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['name'],
            properties: {
              name: {
                type: 'object',
                required: ['language', 'pieces'],
                properties: {
                  language: {
                    type: 'string',
                  },
                  tag: {
                    type: 'string',
                  },
                  pieces: {
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
        ],
      },
    },
  },
};
