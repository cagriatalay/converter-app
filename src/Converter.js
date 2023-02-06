import {useState, useEffect} from 'react';
import API_KEY from './secret';

const Converter = () => {

    const key = API_KEY;

    const [currOne, setCurrOne] = useState('');
    const [currTwo, setCurrTwo] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');
    const [target, setTarget] = useState('');
    const [memory, setMemory] = useState({
    pair_one: '',
    amount: '',
    pair_two: '',
    rate: ''
    });
    const [bool, setBool] = useState(false);

    useEffect(()=>{

    if(amount === ''){
    setTarget('');
    setCurrOne('');
    setCurrTwo('');
    }

    if(result !== '' && target !== ''){
      console.log("lol")
      setBool(true);
    }else{
      setBool(false);
    }

    },[amount, result, target]);

                    const handleSubmit = (e) =>{
                    e.preventDefault();
                    async function fetchData() {
                    const response = await fetch(
                    `https://v6.exchangerate-api.com/v6/${key}/pair/${currOne}/${currTwo}/${amount}`,{
                    type: 'GET'
                    });
                    const data = await response.json();
                    console.log(data);
                      
                    setTarget(data.target_code);
                    setResult(data.conversion_result);
                    };

                    fetchData();

                    if(amount === '' && currOne === '' && currTwo === '' && amount === 0){
                      setAmount('');
                      setResult('');
                      setTarget('');
                      setBool(false);                    
                    }

                    if(amount === '' && currOne !== '' && currTwo !== ''){
                      console.log("ldfskvls");
                      setBool(false)
                    }

                    setMemory({
                      pair_one: currOne,
                      amount: amount,
                      pair_two: currTwo,
                    });
                    };   


                     const handleReset = () =>{
                     setCurrOne('');
                     setCurrTwo('');
                     setAmount('');
                     setResult('');
                     setTarget('');
                     setBool(false);
                     };

                     const handleChange = (e) =>{
                     setAmount(e.target.value);

                     if(currOne !== '' && currTwo !== ''){
                     setResult('');
                     setTarget('');
                     setBool(false);
                     }

                     };

                     const handleSwap = () =>{
                     const x = currOne;
                     const y = currTwo;
                     setCurrOne(y);
                     setCurrTwo(x); 
                     }

return ( 
         <>
            <div className='bg-gray-50 cursor-pointer w-[50vw] h-[50vh] rounded-3xl transition duration-1000 shadow-md sm:w-[90vw] lg:h-[50vh] lg:w-[60vw] xs:w-[80vw] xs:h-[50vh] xxs:w-[90vw] xxs:h-[60vh] sm_h:h-[70vh] xs_h:h-[50vw]' >
                <div className="flex flex-wrap flex-col justify-center items-center w-full h-full subpixel-antialiased p-4 xs:p-6">

                <div className='flex justify-center w-full'>
                <img src="svg.svg" alt="SVG" className='hover:scale-150 transition' onClick={handleSwap}/>
                </div> 

                    <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>

                     <div className="flex justify-between w-[75%] mb-8 sm:w-[80%] lg:w-[80%]">
                     <select className='border-solid w-[35%] border-b bg-gray-50 border-gray-400 text-gray-600 h-8 font-medium text-center cursor-pointer outline-none' name="Currencies" value={currOne} onChange={e => setCurrOne(e.target.value)}>                   
                     <option hidden>Currency</option>
                     <option value='USD'>🇺🇸 USD</option>                     
                     <option value='EUR'>🇪🇺 EUR</option>
                     <option value='GBP'>🇬🇧 GBP</option>
                     <option value='TRY'>🇹🇷 TRY</option>
                     </select>
                     
                     <select className='border-solid w-[35%] border-b bg-gray-50 border-gray-400 text-gray-600 h-8 font-medium text-center cursor-pointer outline-none' name="Currencies" value={currTwo} onChange={e => setCurrTwo(e.target.value)}>
                     <option hidden>Currency</option>
                     <option value='USD'>🇺🇸 USD</option>                     
                     <option value='EUR'>🇪🇺 EUR</option>
                     <option value='GBP'>🇬🇧 GBP</option>
                     <option value='TRY'>🇹🇷 TRY</option>
                     </select>
                     </div>
                     

                     <div className="flex justify-center w-full mb-8">
                        <input className="rounded-xl border-solid border bg-gray-50 border-gray-400 text-gray-600 text-center font-normal outline-none w-[40%] h-8 sm:w-[55%] lg:w-[50%]" type="number" placeholder='Amount' name="Amount" value={amount} onChange={handleChange} />
                     </div>

                     <div className='flex w-[55%] justify-between mb-6 sm:w-[80%] sm:mb-8 lg:w-[80%]  lg:mb-10'>
                     <input className='transition hover:scale-105 bg-gray-200 p-2 rounded-xl text-gray-800 border-gray-300 border  text-xs font-medium shadow-sm' type="submit" value='Submit' />
                     <input className='transition hover:scale-105 bg-gray-200 p-2 rounded-xl text-gray-800 border-gray-300 border text-xs font-medium shadow-sm' type="button" value='Reset' onClick={handleReset} />
                     </div>

                     <div className="text-5xl text-black mb-2 sm:w-fit p-2">
                     <p className="text-center font-medium subpixel-antialiased sm:text-3xl sm:font-semibold xs:text-2xl">{result.toLocaleString()}<span className="text-base font-medium subpixel-antialiased">{target}</span></p>
                     </div>

                    </form>

                    { bool &&
                    <p className='font-medium sm:text-xs sm:text-clip xs:text-[0.7rem] text-green-400'><span className='font-bold pb-2 text-green-500'>{Number(memory.amount).toLocaleString()} {memory.pair_one}</span> = <span className='font-bold pb-2 text-green-600'>{result.toLocaleString()} {memory.pair_two}</span></p>
                    }
          </div>
       </div>
    </>
  );
}
 
export default Converter;