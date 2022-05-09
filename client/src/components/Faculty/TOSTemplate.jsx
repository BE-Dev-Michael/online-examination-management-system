import React from 'react'

export const TOSTemplate = React.forwardRef((props, ref) => {
    return(
      <div ref={ref} className='bg-white mt-56 px-16'>
        <table width='100%'>
          <tr>
            <th className='py-12' colSpan={1} rowSpan={2}>KNOWLEDGE <br></br>DIMENSION</th>
            <th colSpan={7} rowSpan={1}>COGNITIVE PROCESS DIMENSION</th>
          </tr>
          <tr>
            <td>Remember</td>
            <td>Understand</td>
            <td>Apply</td>
            <td>Analyze</td>
            <td>Evaluate</td>
            <td>Create</td>
            <td>Total</td>
          </tr>
          <tr>
            <td>Factual</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Conceptual</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Procedural</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Metacognitive</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    )
})
