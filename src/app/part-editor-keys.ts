import {
  CATEGORIES_PART_TYPEID,
  INDEX_KEYWORDS_PART_TYPEID,
  NOTE_PART_TYPEID,
  BIBLIOGRAPHY_PART_TYPEID,
  DOC_REFERENCES_PART_TYPEID,
  EXTERNAL_IDS_PART_TYPEID,
} from '@myrmidon/cadmus-part-general-ui';
import { PartEditorKeys } from '@myrmidon/cadmus-core';
import {
  POETIC_TEXTS_PART_TYPEID,
  TALE_INFO_PART_TYPEID,
  TALE_STORY_PART_TYPEID,
  AVAILABLE_WITNESSES_PART_TYPEID,
} from '@myrmidon/cadmus-renovella-part-ui';

const GENERAL = 'general';
const RENOVELLA = 'renovella';
// const TOKEN_TEXT_LAYER_PART_TYPEID = 'it.vedph.token-text-layer';

/**
 * The parts and fragments editor keys for this UI.
 * Each property is a part type ID, mapped to a value of type PartGroupKey,
 * having a part property with the part's editor key, and a fragments property
 * with the mappings between fragment type IDs and their editor keys.
 */
export const PART_EDITOR_KEYS: PartEditorKeys = {
  [BIBLIOGRAPHY_PART_TYPEID]: {
    part: GENERAL,
  },
  [CATEGORIES_PART_TYPEID]: {
    part: GENERAL,
  },
  [INDEX_KEYWORDS_PART_TYPEID]: {
    part: GENERAL,
  },
  [NOTE_PART_TYPEID]: {
    part: GENERAL,
  },
  [DOC_REFERENCES_PART_TYPEID]: {
    part: GENERAL,
  },
  [EXTERNAL_IDS_PART_TYPEID]: {
    part: GENERAL,
  },
  [TALE_INFO_PART_TYPEID]: {
    part: RENOVELLA,
  },
  [TALE_STORY_PART_TYPEID]: {
    part: RENOVELLA,
  },
  [AVAILABLE_WITNESSES_PART_TYPEID]: {
    part: RENOVELLA,
  },
  [POETIC_TEXTS_PART_TYPEID]: {
    part: RENOVELLA,
  },
  // layer parts
  // [TOKEN_TEXT_LAYER_PART_TYPEID]: {
  //   part: GENERAL,
  //   fragments: {
  //     [COMMENT_FRAGMENT_TYPEID]: GENERAL,
  //   },
  // },
};
