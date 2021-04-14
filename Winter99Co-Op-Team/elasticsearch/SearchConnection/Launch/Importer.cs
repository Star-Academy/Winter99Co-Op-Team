using System;
using System.Collections.Generic;
using Nest;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Launch
{
    public class Importer<T> where T : class
    {
        private readonly IElasticClient _elasticClient;

        public Importer(IElasticClient elasticClient)
        {
            _elasticClient = elasticClient;
        }

        public void Import(IEnumerable<T> documents, string indexName)
        {
            var bulk = SetupBulk(documents, indexName);
            _elasticClient.Bulk(bulk);
        }

        private static BulkDescriptor SetupBulk(IEnumerable<T> documents, string indexName)
        {
            var bulk = new BulkDescriptor();
            foreach (var document in documents)
            {
                bulk.Index<T>(x => x
                    .Index(indexName)
                    .Document(document));
            }

            return bulk;
        }
    }
}