import Enzyme, { shallow } from 'enzyme'
import '@testing-library/jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import JokeForm from './JokeForm'
import { render,  screen } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

it("renders without hii crashing", () => {
    shallow(<JokeForm />);
});

// it('category must be any or selected by custom drop down',() =>{
//   const { container } = render(<App />)
//    const ss= container.querySelector('.category').checked
//    const element = screen.getByTestId('custom-cat').value;
//    const pass = element != undefined && ss==true;
//      expect(pass).toBe(false)
// });

it('category must be any or selected by custom ',() =>{
  const { container } = render(<App />)
  const ss = container.querySelector('#custom').checked
   
  //  const element = screen.getByTestId('custom-cat').value;
  //  const pass = element != undefined && ss==true;
  //    expect(pass).toBe(false)
});

  it('Type must be selected atleast single or twopart ', () => {
    const { container } = render(<JokeForm />)
    const element=[]
    element.push(container.querySelector('#single').checked)
    element.push(container.querySelector('#twopart').checked)
    expect(element).toContain(true)
  })
  

  it('joke amount should be greater than 0 and less than 11',() =>{
    const { container } = render(<App />)
    const element = screen.getByTestId('amount').value;
    //console.log(element)
    const pass = element> 0 && element <= 10;
    expect(pass).toBe(true)
    })