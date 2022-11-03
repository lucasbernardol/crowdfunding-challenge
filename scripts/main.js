const ProjectOverlay = document.querySelector(selector('project-overlay'));
const CompletedOverlay = document.querySelector(selector('completed-overlay'));

const projects = document.querySelectorAll(selector('project', 'ref'));

/**
 * Buttons
 */
const OpenProjectOverlay = document.querySelector(selector('project-back'));
const CloseProjectOverlay = document.querySelector(selector('close-project'));
const CloseCompletedOverlay = document.querySelector(
  selector('completed-close')
);

const body = () => document.body;

// Elevation;
function selector(dataId, type = 'id') {
  return `[data-${type}="${dataId}"]`;
}

// Constants
const _HIDDEN_CLASSNAME = 'hidden';

const nodeListToArray = (node) => {
  return Array.from(node);
};

class Styles {
  static apply(element, styles) {
    const keys = Object.keys(styles);

    for (const key of keys) {
      element.style[key] = styles[key];
    }
  }
}

/**
 * Utils
 */
const overflow = (hidden = false) => {
  const _body = body();

  return hidden
    ? Styles.apply(_body, { overflow: 'hidden' })
    : Styles.apply(_body, { overflow: 'auto' });
};

function main() {
  const _ = nodeListToArray(projects);

  _.forEach((project) => {
    project.addEventListener('click', (event) => {
      const { target } = event;

      if (target.tagName === 'FORM') {
        _.forEach((element) => {
          element.querySelector('input').checked = false;

          element.classList.remove('selected');
        });

        // check input
        const input = target.querySelector('input');

        input.checked = true;

        target.classList.add('selected');
      }
    });
  });

  /**
   * Events
   */
  OpenProjectOverlay.addEventListener('click', () => {
    ProjectOverlay.classList.remove(_HIDDEN_CLASSNAME);
    overflow(true);
  });

  CloseProjectOverlay.addEventListener('click', () => {
    ProjectOverlay.classList.add(_HIDDEN_CLASSNAME);
    overflow(false);
  });

  CloseCompletedOverlay.addEventListener('click', () => {
    CompletedOverlay.classList.add(_HIDDEN_CLASSNAME);
    overflow(false);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  return main();
});

window.addEventListener('submit', (event) => {
  event.preventDefault();

  // remove "target" selected class
  const { target } = event;

  target.classList.remove('selected');

  ProjectOverlay.classList.add(_HIDDEN_CLASSNAME);
  CompletedOverlay.classList.remove(_HIDDEN_CLASSNAME);
});
