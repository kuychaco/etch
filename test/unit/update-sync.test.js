/** @jsx etch.dom */

import etch from '../../src/index'

describe('etch.updateSync(component)', () => {
  it('performs an update of the component\'s element and any resulting child updates synchronously', () => {
    class ParentComponent {
      constructor () {
        this.greeting = 'Hello'
        this.greeted = 'World'
        etch.initialize(this)
      }

      render () {
        return (
          <div>
            <ChildComponent greeting={this.greeting}></ChildComponent> <span>{this.greeted}</span>
          </div>
        )
      }

      update () {}
    }

    class ChildComponent {
      constructor ({greeting}) {
        this.greeting = greeting
        etch.initialize(this)
      }

      render () {
        return <span>{this.greeting}</span>
      }

      update ({greeting}) {
        this.greeting = greeting
        etch.update(this)
      }
    }

    let component = new ParentComponent()
    expect(component.element.textContent).to.equal('Hello World')
    component.greeting = 'Goodnight'
    component.greeted = 'Moon'
    etch.updateSync(component)
    expect(component.element.textContent).to.equal('Goodnight Moon')
  });
});
