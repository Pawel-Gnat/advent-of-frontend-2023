import { Component, renderComponent } from './index';

test('Component state update and re-render', () => {
  class MyComponent extends Component {
    template() {
      return `<p>${this.state.greeting}</p>`;
    }
  }

  const myComponent = new MyComponent({ greeting: 'Hello' });
  const output = renderComponent(myComponent);
  expect(output).toBe('<p>Hello</p>');

  myComponent.setState({ greeting: 'Goodbye' });
  const updatedOutput = renderComponent(myComponent);
  expect(updatedOutput).toBe('<p>Goodbye</p>');
});

test('Component without state should render template correctly', () => {
  class EmptyStateComponent extends Component {
    template() {
      return `<span>No state</span>`;
    }
  }

  const emptyStateComponent = new EmptyStateComponent();
  const output = renderComponent(emptyStateComponent);
  expect(output).toBe('<span>No state</span>');
});

test('Component should apply styles if provided', () => {
  class StyledComponent extends Component {
    template() {
      return `<div style="${this.style}">${this.state.message}</div>`;
    }
  }

  const styledComponent = new StyledComponent({ message: 'Styled Message' }, 'color: red;');
  const output = renderComponent(styledComponent);
  expect(output).toBe('<div style="color: red;">Styled Message</div>');
});
