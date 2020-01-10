// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - April 8th 2015 12:30 GMT+1
/* jshint asi: true */

// PipelineDeals.gs
// ================
//
// Object for interacting with the PipelineDeals website.
//
// The UrlFetchApp.fetch() will throw an error to anything but response code 200

var API_URL = 'https://api.pipelinedeals.com/api/v3/'
var KEY_STRING = '?api_key='

/**
 * Send a GET request to the PipelineDeals API
 *
<h3>Example:</h3>
<pre>  
&nbsp;  // Get the 'deal1' object
&nbsp;  PipelineDeals.get(API_KEY, 'deals.json', 'conditions[deal_name]=deal1')
</pre> 
 *
 * @param {string} key PipelineDeals' API key
 * @param {string} command 
 * @param {string} parameters Optional parameters field
 *
 * @return {object} response object (or error thrown)
 */

function get(key, command, parameters) {
  
  assertStringNotEmpty_(
    key, 
    'You must provide an API key to PipelineDeals.get()')
    
  assertStringNotEmpty_(
    command, 
    'You must provide a command to PipelineDeals.get()')
    
  parameters = setDefault_(parameters, '')
  
  var andString = (parameters !== '') ? '&' : ''
  var url = API_URL + command + KEY_STRING + key + andString + parameters
  var json = UrlFetchApp.fetch(url)

  // This has to be slight verbose, otherwise the JSON.parse fails

  if (json == '' || json === null) {
  
    throw new Error('Empty response from PipelineDeals.get()')
    
  } else {
  
    return JSON.parse(json)
  }
  
} // PipelineDeals.get()
  
/**
 * Send a POST request to the PipelineDeals API
 *
<h3>Example:</h3>
<pre>  
&nbsp;  // Create the 'deal1' deal
&nbsp;  response = PipelineDeals.post(API_KEY, 'deals.json', 'deal[name]=deal1')
</pre> 
 *
 * @param {string} key PipelineDeals' API key 
 * @param {string} command 
 * @param {string} payload Optional payload
 *
 * @return {object} response object (or error thrown)
 */

function post(key, command, payload) {

  assertStringNotEmpty_(
    key, 
    'You must provide an API key to PipelineDeals.post()')
    
  assertStringNotEmpty_(
    command, 
    'You must provide a command to PipelineDeals.post()')
    
  payload = setDefault_(payload, '')

  var options = {    
    "method" : "post",
    "payload" : payload,
    "muteHttpExceptions": false,
  }
  
  var url = API_URL + command  + KEY_STRING + key
  var json = UrlFetchApp.fetch(url, options)

  // This has to be slight verbose, otherwise the JSON.parse fails

  if (json == '' || json === null) {
  
    throw new Error('Empty repsonse from PipelineDeals.post()')
    
  } else {
  
    return JSON.parse(json)
  }
    
} // PipelineDeals.post()

/**
 * Send a PUT request to the PipelineDeals API
 *
<h3>Example:</h3>
<pre>  
&nbsp;  // Add person 9999 to 'deal1' deal
&nbsp;  PipelineDeals.put(API_KEY, 'people/9999.json', 'person[deal_ids][]=deal1')
</pre> 
 *
 * @param {string} key PipelineDeals' API key 
 * @param {string} command PUT command
 * @param {string} payload Optional payload
 *
 * @return {object} response object (or error thrown)
 */
 
function put(key, command, payload) {

  assertStringNotEmpty_(
    key, 
    'You must provide an API key to PipelineDeals.put()')
    
  assertStringNotEmpty_(
    command, 
    'You must provide a command to PipelineDeals.put()')
    
  payload = setDefault_(payload, '')

  var options = {    
    "method" : "put",
    "payload" : payload,
  }
  
  var url = API_URL + command  + KEY_STRING + key
  var json = UrlFetchApp.fetch(url, options)
  
  // This has to be slight verbose, otherwise the JSON.parse fails

  if (json == '' || json === null) {
  
    throw new Error('Empty repsonse from PipelineDeals.put()')
    
  } else {
  
    return JSON.parse(json)
  }
      
} // PipelineDeals.put()
 
/**
 * Send a DELETE request to the PipelineDeals API
 *
<h3>Example:</h3>
<pre>  
&nbsp;  // Delete the deal with id 99
&nbsp;  PipelineDeals.delete(API_KEY, 'deals/99.json')
</pre> 
 *
 * @param {string} key PipelineDeals' API key 
 * @param {string} command 
 * @param {string} payload Optional payload
 *
 * @return {object} response object or null
 */
  
function deleteAction(key, command, payload) {
  
  assertStringNotEmpty_(
    key, 
    'You must provide an API key to PipelineDeals.deleteAction()')
    
  assertStringNotEmpty_(
    command, 
    'You must provide a command to PipelineDeals.deleteAction()')
    
  payload = setDefault_(payload, '')
    
  var options = {    
    "method" : "delete",
    "payload" : payload,
  }
  
  var url = API_URL + command  + KEY_STRING + key
  var json = UrlFetchApp.fetch(url, options)  
  var result

  // This has to be slight verbose, otherwise the JSON.parse fails

  try {
    result = JSON.parse(json)
  } catch (error) {
    result = null
  }
  
  return result

} // PipelineDeals.deleteAction()

// Private Functions
// =================

/**
 * Assert a value is a string and it is not empty
 *
 * @param {object} testValue The value to test
 * @param {string} errorMessage The error message to throw 
 */

function assertStringNotEmpty_(testValue, errorMessage) {

  if (typeof testValue !== 'string') {
  
    throw new TypeError(errorMessage)
  }
  
  assertNotEmpty_(testValue, errorMessage)
  
} // assertStringNotEmpty_()

/**
 * Assert a value is not empty
 *
 * @param {object} testValue The value to test
 * @param {string} errorMessage The error message to throw 
 */

function assertNotEmpty_(testValue, errorMessage) {

  if (testValue === '') {
  
    throw new TypeError(errorMessage)
  }
  
} // assertNotEmpty_()

/**
 * Set a default value
 *
 * @param {object} actualValue
 * @param {object} defaultValue
 *
 * @return {object} actual or default value
 */
 
function setDefault_(actualValue, defaultValue) {

  var result;
  
  if (typeof actualValue === 'undefined' || 
      typeof actualValue === null ||
      actualValue == '') {
      
    result = defaultValue
    
  } else {
    
    result = actualValue
  }
  
  return result
  
} // setDefault_()
