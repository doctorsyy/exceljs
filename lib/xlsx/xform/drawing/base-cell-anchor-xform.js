'use strict';

const utils = require('../../../utils/utils');
const BaseXform = require('../base-xform');

const BaseCellAnchorXform = function() {};

utils.inherits(BaseCellAnchorXform, BaseXform, {
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case this.tag:
        this.reset();
        this.model = {
          range: {
            editAs: node.attributes.editAs || 'oneCell',
          },
        };
        break;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        break;
    }
    return true;
  },

  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  },

  reconcilePicture(model, options) {
    if (model && model.rId) {
      const rel = options.rels[model.rId];
      const match = rel.Target.match(/.*\/media\/(.+[.][a-z]{3,4})/);
      if (match) {
        const name = match[1];
        const mediaId = options.mediaIndex[name];
        return options.media[mediaId];
      }
    }
    return undefined;
  },
});

module.exports = BaseCellAnchorXform;
