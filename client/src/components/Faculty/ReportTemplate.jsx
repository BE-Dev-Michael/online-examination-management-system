import React, { useState } from 'react'
import logo from '../../assets/images/logo-c.png'

export const ReportTemplate = React.forwardRef((props, ref) => {
    let overallTotal = 0

    const questionNoGenerator = (kd, cpd) => {
      return props.details.questions.flatMap((data, index) => data.kd === kd && data.cpd === cpd ? index+1 : []).join(', ')
    }

    const computeTotalKnowledgeDimension = (kd) => {
      const count = props.details.questions.map(data => data.kd === kd ? 1 : 0)
      const total = count.reduce((prev, curr) => prev + curr, 0)
      overallTotal += total
      return total
    }

    const computeTotalCognitiveProcessDimension = (cpd) => {
      const count = props.details.questions.map(data => data.cpd === cpd ? 1 : 0)
      const total = count.reduce((prev, curr) => prev + curr, 0)
      overallTotal += total
      return total
    }
   
    return(
      <>
        <div ref={ref} className='relative'>
           {/* //* Exam Instance */}
          <div className=''>
            <div className='flex justify-center items-center m-5'>
              <img src={logo} alt="" width={120}/>
            </div>
            <div className='flex flex-col gap-1 justify-center items-center m-5'>
              <h1 className='font-bold'>{props.details.title}</h1>
            </div>
            {props.details.questions.map((data, index) => {
              return <div className='w-full mb-2'>
                        <h1 className='font-bold text-sm'>{`${index+1}. ${data.question}`}</h1>
                        <div className='flex flex-col pl-5 text-sm'>
                          {data.choices.map((choice, index) => {
                            return <span>{`${String.fromCharCode(index+97)}. ${choice}`}</span>
                          })}
                        </div>
                      </div>
            })}
          </div>
          {/* //*2D TOS */}
          <div className='tos-div'>
            <div className='flex justify-center items-center m-5'>
              <img src={logo} alt="" width={120}/>
            </div>
            <div className='flex flex-col gap-1 justify-center items-center m-5'>
              <h1 className='font-bold'>{props.details.title}</h1>
              <h1 className='font-bold'>Two-Dimensional Table of Specifications</h1>
            </div>
            <table width='100%'>
              <tr>
                <th className='py-6' colSpan={1} rowSpan={2}>KNOWLEDGE <br></br>DIMENSION</th>
                <th className='py-4' colSpan={7} rowSpan={1}>COGNITIVE PROCESS DIMENSION</th>
              </tr>
              <tr>
                <th>Remember</th>
                <th>Understand</th>
                <th>Apply</th>
                <th>Analyze</th>
                <th>Evaluate</th>
                <th>Create</th>
                <th>Total</th>
              </tr>
              <tr>
                <th colSpan={1}>Factual</th>
                <td>{/* //*Factual-Remember */}
                  {questionNoGenerator('A', '1')}
                  {/* {[...Array(100).keys()].join(', ')} */}
                </td>
                <td>{/* //*Factual-Understand */}
                  {questionNoGenerator('A', '2')}
                </td>
                <td>{/* //*Factual-Apply */}
                  {questionNoGenerator('A', '3')}
                </td>
                <td>{/* //*Factual-Analyze */}
                  {questionNoGenerator('A', '4')}
                </td>
                <td>{/* //*Factual-Evaluate */}
                  {questionNoGenerator('A', '5')}
                </td>
                <td>{/* //*Factual-Create */}
                  {questionNoGenerator('A', '6')}
                </td>
                <td>
                  {computeTotalKnowledgeDimension('A')}
                </td>
              </tr>
              <tr>
                <th colSpan={1}>Conceptual</th>
                <td>{/* //*Conceptual-Remember */}
                  {questionNoGenerator('B', '1')}
                </td>
                <td>{/* //*Conceptual-Understand */}
                  {questionNoGenerator('B', '2')}
                </td>
                <td>{/* //*Conceptual-Apply */}
                  {questionNoGenerator('B', '3')}
                </td>
                <td>{/* //*Conceptual-Analyze */}
                  {questionNoGenerator('B', '4')}
                </td>
                <td>{/* //*Conceptual-Evaluate */}
                  {questionNoGenerator('B', '5')}
                </td>
                <td>{/* //*Conceptual-Create */}
                  {questionNoGenerator('B', '6')}
                </td>
                <td>
                  {computeTotalKnowledgeDimension('B')}
                </td>
              </tr>
              <tr>
                <th colSpan={1}>Procedural</th>
                <td>{/* //*Procedural-Remember */}
                  {questionNoGenerator('C', '1')}
                </td>
                <td>{/* //*Procedural-Understand */}
                  {questionNoGenerator('C', '2')}
                </td>
                <td>{/* //*Procedural-Apply */}
                  {questionNoGenerator('C', '3')}
                </td>
                <td>{/* //*Procedural-Analyze */}
                  {questionNoGenerator('C', '4')}
                </td>
                <td>{/* //*Procedural-Evaluate */}
                  {questionNoGenerator('C', '5')}
                </td>
                <td>{/* //*Procedural-Create */}
                  {questionNoGenerator('C', '6')}
                </td>
                <td>
                  {computeTotalKnowledgeDimension('C')}
                </td>
              </tr>
              <tr>
                <th colSpan={1}>Metacognitive</th>
                <td>{/* //*Metacognitive-Remember */}
                  {questionNoGenerator('D', '1')}
                </td>
                <td>{/* //*Metacognitive-Understand */}
                  {questionNoGenerator('D', '2')}
                </td>
                <td>{/* //*Metacognitive-Apply */}
                  {questionNoGenerator('D', '3')}
                </td>
                <td>{/* //*Metacognitive-Analyze */}
                  {questionNoGenerator('D', '4')}
                </td>
                <td>{/* //*Metacognitive-Evaluate */}
                  {questionNoGenerator('D', '5')}
                </td>
                <td>{/* //*Metacognitive-Create */}
                  {questionNoGenerator('D', '6')}
                </td>
                <td>
                  {computeTotalKnowledgeDimension('D')}
                </td>
              </tr>
              <tr>
                <th colSpan={1}>Total</th>
                <td>{computeTotalCognitiveProcessDimension('1')}</td>
                <td>{computeTotalCognitiveProcessDimension('2')}</td>
                <td>{computeTotalCognitiveProcessDimension('3')}</td>
                <td>{computeTotalCognitiveProcessDimension('4')}</td>
                <td>{computeTotalCognitiveProcessDimension('5')}</td>
                <td>{computeTotalCognitiveProcessDimension('6')}</td>
                <td>{overallTotal}</td>
              </tr>
            </table>
            <div className='flex justify-center items-center text-sm mt-5 border border-black rounded-sm'>
              Date Generated: {new Date().toLocaleString('en-US', 
              { 
                month: 'short', 
                day: 'numeric', 
                weekday: 'short', 
                year: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric'
              })}
            </div>
          </div>
        </div>
        
      </>
    )
})
