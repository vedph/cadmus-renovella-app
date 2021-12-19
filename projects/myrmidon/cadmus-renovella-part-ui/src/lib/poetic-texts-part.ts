import { Part } from '@myrmidon/cadmus-core';

/**
 * Information about a poetic text in the PoeticTextsPart.
 */
export interface PoeticText {
  incipit: string;
  metre: string;
  note?: string;
}

/**
 * The PoeticTexts part model.
 */
export interface PoeticTextsPart extends Part {
  texts: PoeticText[];
}

/**
 * The type ID used to identify the PoeticTextsPart type.
 */
export const POETIC_TEXTS_PART_TYPEID = 'it.vedph.renovella.poetic-texts';

/**
 * JSON schema for the PoeticTexts part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const POETIC_TEXTS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/renovella/' + POETIC_TEXTS_PART_TYPEID + '.json',
  type: 'object',
  title: 'PoeticTextsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'texts',
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
    texts: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['incipit', 'metre'],
            properties: {
              incipit: {
                type: 'string',
              },
              metre: {
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
};
