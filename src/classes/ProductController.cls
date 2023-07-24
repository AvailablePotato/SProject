public class ProductController {

	@AuraEnabled
	public static List<Product__c> getProducts() {
		return [SELECT Id__c, Name, Type__c, Family__c, Description__c, Price__c, Image__c FROM Product__c];
	}
}