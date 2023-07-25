public class ProductController {

	static String mainQuery = 'SELECT Id__c, Name, Type__c, ' +
	'Family__c, Description__c, Price__c, Image__c FROM Product__c';
	static String searchQuery = '';
	static String filterQuery = '';

	@AuraEnabled
	public static List<Product__c> getProducts(String searchBarQuery, Map<String,List<String>> filters) {
		String queryConnector = '';
		if (searchBarQuery.length() > 0)
			{
				queryConnector = ' WHERE ';
				String nameOrDescription = '%' + searchBarQuery + '%';
				searchQuery += 'Name LIKE \'' + nameOrDescription + '\' OR Description__C LIKE \'' +
						nameOrDescription + '\'';
			}
/*		if (searchBarEmpty) {
			searchQuery = '';
		}*/
		if (filters.size() > 0)
			{

			}
/*		if (noFilters) {
			filterQuery = '';
		}*/
		return Database.query(mainQuery + queryConnector + searchQuery + filterQuery);
	}
}