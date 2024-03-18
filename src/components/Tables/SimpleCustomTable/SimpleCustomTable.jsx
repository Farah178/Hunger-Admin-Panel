import React from 'react';
import { Tab, Tabs, Button, Table } from 'react-bootstrap';
import './styles.css'

function CustomTable({ headers, data, actions, isPaymentReceived, handleToggle }) {
    // Exclude the ID column index from the headers
    const idColumnIndex = headers.indexOf('Id');
    
    return (
        <div>
            <Table className="text-center" hover>
                <thead className='table-column-header-style'>
                    <tr>
                        {/* Render table headers excluding the ID column */}
                        {headers.map((header, index) => (
                            index !== idColumnIndex && <th key={index} className='table-column-header-style'>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* Exclude the ID column from each row */}
                            {row.map((cell, cellIndex) => (
                                cellIndex !== idColumnIndex && (
                                    <td key={cellIndex} className='table-row-style'>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {/* Check if the header is 'Abbreviation' */}
                                            {headers[cellIndex] === 'icon' ? (
                                                // <img src={cell} alt="icon" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
                                                <img
                                                    src={cell}
                                                    alt="icon"
                                                    style={{
                                                        borderRadius: '50%',
                                                        width: '50px',
                                                        height: '50px',
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null; // Prevent infinite loop
                                                        e.target.src = 'https://img.freepik.com/free-photo/red-gift-tag-price-ticket-with-red-ribbon-isolated-white_1101-2266.jpg?w=1800&t=st=1707896796~exp=1707897396~hmac=d8cb9dbcb33daebdc61816b0f459a94081c770115bccc6f3047aeeac79359c05'; // Set default image source
                                                    }}
                                                />
                                            ) :
                                                (
                                                    // Check if cell is defined and is a string
                                                    (typeof cell === 'string' && cell.length > 20) ? (
                                                        // Truncate content if it exceeds 20 characters
                                                        <span title={cell.length > 30 ? cell : ''}>
                                                            {cell.substring(0, 30) + '...'}
                                                        </span>
                                                    ) : (
                                                        cell
                                                    )
                                                )}
                                            <div>
                                                {headers[cellIndex] === 'Pickup' || headers[cellIndex] === 'Delievry' ? (
                                                    <>
                                                        <input type="checkbox" id="switch" checked={isPaymentReceived} onClick={handleToggle} />
                                                        <label1 onClick={handleToggle} htmlFor="switch"></label1>

                                                        {/* <input type="checkbox" id={`switch-${index}`} checked={isPaymentReceived} onClick={() => handleToggle(index)} />
                                                        <label htmlFor={`switch-${index}`} onClick={() => handleToggle(index)}></label> */}
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </td>
                                )
                            ))}
                            <td className='table-row-style'>
                                {/* Actions */}
                                {actions && actions.map((action, actionIndex) => (
                                    <Button key={actionIndex} variant="link" onClick={() => action.onClick(row)}>
                                        {action.icon}
                                    </Button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CustomTable;
