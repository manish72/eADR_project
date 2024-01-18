package com.adobe.livecycle.sample.caltrans;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Timer;
import java.util.TimerTask;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.swagger.client.api.BaseUrisApi;
import io.swagger.client.api.TransientDocumentsApi;
import io.swagger.client.model.ApiClient;
import io.swagger.client.model.ApiException;
import io.swagger.client.model.baseUris.BaseUriInfo;
import io.swagger.client.model.transientDocuments.TransientDocumentResponse;

public class AdobeSignatureServiceImpl implements AdobeSignatureService {

	private static Logger logger = LoggerFactory.getLogger(AdobeSignatureService.class);
	static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
	static String rootURL;
	// static String refreshToken =
	// "3AAABLblqZhD2h4DKNE-q4yBQN6vZvTv7vCD6-wKSCUiCVItwTGIpBOnavkST1gIKs0Yl-j8zn3A*";
	static String invalidRequest = "invalid refresh token";

//	public static void main(String[] args) throws IOException, JSONException {
//		// String refreshtoken = getRefreshToken(authcode);
//		// System.out.println(refreshtoken);
//		// String authorization_token = getAuthorizationToken(refreshToken);
//		// System.out.println("main -->" + authorization_token);
//
//		// createAgreement(refreshToken, "dhanunjay.divvala@touchpointsinc.com", "Caltrans");
//		//getAgreementStatus("CBJCHBCAABAA0ZzbQSC2oVI6i2cFvgqsEPESTsAe5YZK", "");
//
//	}
	// STEP-2 - Get the refresh token
	public String getRefreshToken(String clientID, String clientSecret, String redirectURI, String authCode,
			String rootRefreshURL) throws UnsupportedEncodingException, JSONException {
		LocalDateTime now = LocalDateTime.now();
		logger.info("Inside getRefreshToken method at : " + dtf.format(now));
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("grant_type", "authorization_code");
		params.put("client_id", clientID);
		params.put("client_secret", clientSecret);
		params.put("redirect_uri", redirectURI);
		params.put("code", authCode);
		String convertToURL = "";
		for (Entry<String, Object> param : params.entrySet()) {
			if (convertToURL.length() != 0)
				convertToURL += '&';
			convertToURL += URLEncoder.encode(param.getKey(), "UTF-8");
			convertToURL += "=";
			convertToURL += URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8");
		}
		logger.info("Calling getResponse function");
		String response = getResponse(rootRefreshURL, convertToURL, "oauth/v2/token");
		JSONObject jsonObj = new JSONObject(response.toString());
		logger.info("Got jsonObject response");
		return (String) jsonObj.get("refresh_token");

	}

	// STEP-3 - get the authorization token
	private static String getAuthorizationToken(String clientID, String clientSecret, String refreshToken)
			throws JSONException, IOException {
		LocalDateTime now = LocalDateTime.now();
		logger.info("Inside getAuthorizationToken method at:" + dtf.format(now));

		Map<String, Object> params = new LinkedHashMap<>();
		params.put("grant_type", "refresh_token");
		params.put("client_id", clientID);
		params.put("client_secret", clientSecret);
		params.put("refresh_token", refreshToken);
		String convertToURL = "";
		for (Entry<String, Object> param : params.entrySet()) {
			if (convertToURL.length() != 0)
				convertToURL += '&';
			convertToURL += URLEncoder.encode(param.getKey(), "UTF-8");
			convertToURL += "=";
			convertToURL += URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8");
		}
		logger.info("Calling getResponse function");
		String response = getResponse(rootURL, convertToURL, "oauth/v2/refresh");
		if (response == invalidRequest) {
			logger.info("Invalid refresh token found");
			return "Invalid refresh token";
		} else {
			logger.info("Json response got for the passed refresh token");
			JSONObject jsonObj = new JSONObject(response.toString());
			return (String) jsonObj.get("access_token");
		}
	}

	// STEP-4 - get the authorization token
	private static String submitTransientDocument(String accessToken, String filePath, String fileName)
			throws JSONException, IOException {
		LocalDateTime now = LocalDateTime.now();
		logger.info("Inside submitTransientDocument method at: " + dtf.format(now));

		String transientDocumentId = null;
		try {
			ApiClient apiClient = new ApiClient();

			String endpointUrl = "/api/rest/v6";
			apiClient.setBasePath(rootURL + endpointUrl);

			// Provide an OAuth Access Token as "Bearer : access token" in authorization
			String authorization = "Bearer " + accessToken;

			// Get the baseUris for the user and set it in apiClient.
			BaseUrisApi baseUrisApi = new BaseUrisApi(apiClient);
			BaseUriInfo baseUriInfo = baseUrisApi.getBaseUris(authorization);
			apiClient.setBasePath(baseUriInfo.getApiAccessPoint() + endpointUrl);

			File file = new File(filePath + fileName);
			String xApiUser = null;
			String xOnBehalfOfUser = null;
			String mimeType = "application/pdf";

			// Get the id of the transient document.
			TransientDocumentsApi transientDocumentsApi = new TransientDocumentsApi(apiClient);
			TransientDocumentResponse response = transientDocumentsApi.createTransientDocument(authorization, file,
					xApiUser, xOnBehalfOfUser, fileName, mimeType);
			transientDocumentId = response.getTransientDocumentId();
			logger.info("transientDocumentId   --> " + transientDocumentId);
		} catch (ApiException e) {
			logger.error(e.toString());
		}
		return transientDocumentId;
	}

	// STEP-5
	public String createAgreement(String clientID, String clientSecret, String refreshToken, String rootPathURL,
			String filePath, String fileName, String name, String email) throws JSONException, IOException {
		LocalDateTime now = LocalDateTime.now();
		logger.info("Custom Adobe Sign Service started at: " + dtf.format(now));
		logger.info("Inside createAgreement method");

		rootURL = rootPathURL;
		String accessToken = getAuthorizationToken(clientID, clientSecret, refreshToken);
		logger.info("accessToken in createAgreement --> " + accessToken);

		// Getting transientDocumentId
		String transientDocumentId = submitTransientDocument(accessToken, filePath, fileName);
		logger.info("transientDocumentId in createAgreement --> " + transientDocumentId);

		String url = rootURL + "api/rest/v6/agreements";
		URL object = new URL(url);

		HttpURLConnection con = (HttpURLConnection) object.openConnection();
		con.setDoOutput(true);
		con.setDoInput(true);
		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Accept", "application/json");
		con.setRequestProperty("Authorization", "Bearer " + accessToken);
		con.setRequestMethod("POST");

		String postJsonData = "{\r\n" + "  \"fileInfos\": [\r\n" + "    {\r\n" + "      \"transientDocumentId\": \""
				+ transientDocumentId + "\"\n" + "    }\r\n" + "  ],\r\n" + "  \"name\": \"" + name + "\",\r\n"
				+ "  \"participantSetsInfo\": [\r\n" + "    {\r\n" + "      \"order\": 1,\r\n"
				+ "      \"role\": \"SIGNER\",\r\n" + "      \"memberInfos\": [\r\n" + "        {\r\n"
				+ "          \"email\": \"" + email + "\"\r\n" + "        }\r\n" + "      ]\r\n" + "    }\r\n"
				+ "  ],\r\n" + "  \"signatureType\": \"ESIGN\",\r\n" + "  \"state\": \"IN_PROCESS\"\r\n" + "}";

		logger.info("postJsonData in createAgreement --> " + postJsonData);

		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(postJsonData);
		wr.flush();
		wr.close();

		int responseCode = con.getResponseCode();
		logger.info("Response Code : " + responseCode + "\nSending 'POST' request to URL : " + url);

		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String output;
		StringBuffer response = new StringBuffer();

		while ((output = in.readLine()) != null) {
			response.append(output);
		}
		JSONObject res = new JSONObject(response.toString());
		logger.info("Final agreemt creation response  -->" + res.get("id"));
		logger.info("CreateAgreement method call ends here.");

		in.close();
		return (String) res.get("id");

	}

	public String getCronScheduler(String clientID, String clientSecret, String refreshToken, String rootPathURL,
			String agreementID, String filePath) throws JSONException, IOException {
		logger.info("Inside getCronScheduler method");
		List<String> finalList = new ArrayList();
		String accessToken = getAuthorizationToken(clientID, clientSecret, refreshToken);
		logger.info("getCronScheduler accessToken" + accessToken);
		Timer timer = new Timer();
		// Create a new TimerTask to execute the job
		TimerTask task = new TimerTask() {
			@Override
			public void run() {
				// This code will be executed every minute
				logger.info("Running cron job...");
				try {
					String docResult = getAgreementStatus(clientID, clientSecret, refreshToken, rootPathURL,
							agreementID, filePath);
					logger.info("docResult  --> " + docResult);
					if (docResult != "Document Not Yet Signed") {
						String meesage = getCombinedDocument(accessToken, agreementID, filePath);
						logger.info("Document successfully retrieved");
						finalList.add(meesage);
						logger.info("finalList size  --> " + finalList.size());
						if (finalList.size() > 0) {
							logger.info("Got the pdf response.. now cancelling thread");
							timer.cancel();
						}
					}
				} catch (JSONException | IOException e) {
					// TODO Auto-generated catch block
					logger.info("Something went wrong at getCronScheduler method");
					e.printStackTrace();
				}
			}
		};
		// Schedule the task to run every minute, starting now
		logger.info("At schedule cron");
		timer.schedule(task, 0, 3 * 60 * 1000);
		// Wait for the cron job to finish
		try {
			logger.info("At sleep");
			Thread.sleep(1 * 60 * 1000); // Wait for 5 minutes
		} catch (InterruptedException e) {
			logger.info("sleep failed");
			e.printStackTrace();
		}

		return finalList.get(0);
	}
	
	//STEP-6
	public String getAgreementStatus(String clientID, String clientSecret, String refreshToken, String rootPathURL,
			String agreementID, String filePath) throws JSONException, IOException {
		LocalDateTime now = LocalDateTime.now();
		logger.info("Custom Adobe Agreement Status method called at: " + dtf.format(now));
		logger.info("Inside getAgreementStatus method");

		rootURL = rootPathURL;
		String docResult;
		String accessToken = getAuthorizationToken(clientID, clientSecret, refreshToken);
		URL url = new URL(rootURL + "api/rest/v6/agreements/" + agreementID);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");
		conn.setRequestProperty("Authorization", "Bearer " + accessToken);

		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP Error code : " + conn.getResponseCode());
		}

		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String output;
		StringBuffer response = new StringBuffer();
		while ((output = in.readLine()) != null) {
			response.append(output);
		}
		JSONObject res = new JSONObject(response.toString());
		logger.info("Final agreement status  -->" + res.get("status"));
		in.close();

		if (res.get("status").equals("SIGNED")) {
			logger.info("Document was signed");
			docResult = getCombinedDocument(accessToken, agreementID, filePath);
		} else {
			logger.info("Document not yet signed");
			docResult = "Document Not Yet Signed.";
		}

		logger.info("Custom Adobe Agreement Status process completed at: " + new Date().getTime());
		return docResult;
	}

	// SREP-7
	private static String getCombinedDocument(String accessToken, String agreementId, String filePath)
			throws JSONException, IOException {
		LocalDateTime now = LocalDateTime.now();
		logger.info("Inside getCombinedDocument method at: " + dtf.format(now));

		URL url = new URL(rootURL + "api/rest/v6/agreements/" + agreementId + "/combinedDocument");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/pdf;charset=UTF-8");
		conn.setRequestProperty("Authorization", "Bearer " + accessToken);

		int responseCode = conn.getResponseCode();
		logger.info("Response Code : " + responseCode + " - " + conn.getResponseMessage());
		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP Error code : " + conn.getResponseCode());
		}

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		BufferedInputStream in = new BufferedInputStream(conn.getInputStream());
		byte[] buffer = new byte[1024];
		int n;
		while ((n = in.read(buffer)) > 0) {
			baos.write(buffer, 0, n);
		}
		in.close();
		byte[] combinedDocumentResponse = baos.toByteArray();
		logger.info("Final combined document-->" + combinedDocumentResponse.toString());

		try (FileOutputStream outputStream = new FileOutputStream(filePath)) {
			logger.info("<-- File Saved -->");
			outputStream.write(combinedDocumentResponse);
			return "File saved successfully..";
		} catch (Exception e) {
			logger.info("<-- File Not Saved -->");
			return "Something went wrong.. File not saved!!";
		}
	}

	// Get the response common for refresh token and authorization token methods
	private static String getResponse(String rootURL, String postreqdata, String refreshURL) {
		LocalDateTime now = LocalDateTime.now();
		logger.info("Inside getResponse method at: " + dtf.format(now));

		byte[] postData = postreqdata.getBytes(StandardCharsets.UTF_8);
		int postDataLength = postData.length;
		URL url;
		try {
			HttpURLConnection conn = null;
			url = new URL(rootURL + refreshURL);
			conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setInstanceFollowRedirects(false);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Content-Length", Integer.toString(postDataLength));
			conn.setUseCaches(false);
			try (DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
				logger.info("Came to in");
				wr.write(postData);
				wr.flush();
				wr.close();
			}

			int responseCode = conn.getResponseCode();
			logger.info("POST Response Code :: " + responseCode);
			logger.info("POST Status :: " + HttpURLConnection.HTTP_OK);
			if (responseCode == HttpURLConnection.HTTP_OK) { // success
				BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				String inputLine;
				StringBuffer response = new StringBuffer();

				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}
				in.close();
				return response.toString();
			}
			if (responseCode == HttpURLConnection.HTTP_UNAUTHORIZED) {
				return invalidRequest;
			} else {
				logger.info("POST request not worked");
			}
		} catch (Exception e) {
			logger.info("get response service call failed");
			e.printStackTrace();
		}
		return null;
	}

}
